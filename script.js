const tracks = {
  kaksoissielu: "Still My Twin",
  "ainda-aqui": "Still Here",
  "je-te-laisse-partir": "Let You Go"
};
const ids = Object.keys(tracks);
const audios = Object.fromEntries(ids.map(id => [id, document.getElementById(`audio-${id}`)]));

if (ids.every(id => audios[id])) {
  const playError = {};
  const scrubbing = {};
  const pending = {};
  let lastActive = ids[0];

  function timeLabel(seconds) {
    if (!Number.isFinite(seconds)) return "—:—";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function updateTrack(id) {
    const audio = audios[id];
    const current = audio.currentTime || 0;
    const duration = audio.duration || 0;
    const progress = duration ? (current / duration) * 100 : 0;
    const slider = document.querySelector(`[data-progress="${id}"]`);
    if (!scrubbing[id]) slider.value = Math.round(progress * 10);
    slider.style.setProperty("--progress", `${progress}%`);
    slider.setAttribute("aria-valuetext", timeLabel(current));
    document.querySelector(`[data-current="${id}"]`).textContent = timeLabel(current);
    document.querySelector(`[data-total="${id}"]`).textContent = timeLabel(duration);
    document.getElementById(`duration-${id}`).textContent = timeLabel(duration);
    const button = document.querySelector(`[data-play="${id}"]`);
    const label = document.querySelector(`[data-label="${id}"]`);
    const paused = audio.paused;
    button.classList.toggle("is-playing", !paused);
    button.setAttribute("aria-label", `${paused ? "Play" : "Pause"} ${tracks[id]}`);
    label.textContent = playError[id] ? "unable to play" : (paused ? "listen" : "now playing");
    if (id === lastActive) updatePosition();
  }

  function updatePosition() {
    if (!("mediaSession" in navigator) || !navigator.mediaSession.setPositionState) return;
    const audio = audios[lastActive];
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const position = Math.min(Math.max(audio.currentTime, 0), audio.duration);
    try {
      navigator.mediaSession.setPositionState({
        duration: audio.duration,
        playbackRate: audio.playbackRate || 1,
        position
      });
    } catch (error) {
      /* Some browsers reject a position that lands past the duration. */
    }
  }

  function syncSession() {
    if (!("mediaSession" in navigator)) return;
    const active = ids.find(id => !audios[id].paused);
    navigator.mediaSession.playbackState = active ? "playing" : "paused";
    if (!active) return;
    lastActive = active;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: tracks[active],
      artist: "still, somewhere",
      album: "still, somewhere"
    });
    updatePosition();
  }

  function playRelative(step) {
    const index = ids.indexOf(lastActive);
    const next = ids[(index + step + ids.length) % ids.length];
    audios[next].play().catch(() => {
      playError[next] = true;
      updateTrack(next);
    });
  }

  if ("mediaSession" in navigator) {
    const handlers = {
      play: () => {
        audios[lastActive].play().catch(() => {
          playError[lastActive] = true;
          updateTrack(lastActive);
        });
      },
      pause: () => audios[lastActive].pause(),
      previoustrack: () => playRelative(-1),
      nexttrack: () => playRelative(1),
      seekbackward: details => {
        const audio = audios[lastActive];
        const skip = details.seekOffset || 10;
        audio.currentTime = Math.max(0, audio.currentTime - skip);
      },
      seekforward: details => {
        const audio = audios[lastActive];
        const skip = details.seekOffset || 10;
        const end = Number.isFinite(audio.duration) ? audio.duration : audio.currentTime + skip;
        audio.currentTime = Math.min(end, audio.currentTime + skip);
      }
    };
    Object.entries(handlers).forEach(([action, handler]) => {
      try { navigator.mediaSession.setActionHandler(action, handler); } catch (error) { /* unsupported */ }
    });
  }

  ids.forEach(id => {
    const audio = audios[id];
    audio.removeAttribute("controls");

    audio.addEventListener("loadedmetadata", () => updateTrack(id));
    audio.addEventListener("timeupdate", () => updateTrack(id));
    audio.addEventListener("seeked", () => updateTrack(id));
    audio.addEventListener("ended", () => updateTrack(id));
    audio.addEventListener("play", () => {
      lastActive = id;
      playError[id] = false;
      ids.filter(other => other !== id).forEach(other => {
        if (!audios[other].paused) audios[other].pause();
      });
      updateTrack(id);
      syncSession();
    });
    audio.addEventListener("pause", () => {
      updateTrack(id);
      syncSession();
    });
    audio.addEventListener("play-failed", () => {
      playError[id] = true;
      updateTrack(id);
    });

    document.querySelector(`[data-play="${id}"]`).addEventListener("click", async () => {
      if (pending[id]) return;
      if (!audio.paused) {
        playError[id] = false;
        audio.pause();
        return;
      }
      pending[id] = true;
      playError[id] = false;
      try {
        await audio.play();
      } catch (error) {
        playError[id] = true;
        updateTrack(id);
      } finally {
        pending[id] = false;
      }
    });

    const slider = document.querySelector(`[data-progress="${id}"]`);
    slider.addEventListener("pointerdown", () => { scrubbing[id] = true; });
    slider.addEventListener("pointerup", () => { scrubbing[id] = false; });
    slider.addEventListener("pointercancel", () => { scrubbing[id] = false; });
    slider.addEventListener("input", event => {
      if (!audio.duration) return;
      audio.currentTime = (Number(event.target.value) / 1000) * audio.duration;
    });
  });
}
