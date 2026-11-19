// Paroles synchronisées pour la chanson française (affichage finnois / portugais).
// Les horodatages sont approximatifs : si le défilement est en avance ou en retard,
// ajuste OFFSET (en secondes). Valeur positive = les paroles avancent plus tôt.
(() => {
  const TRACK_ID = "je-te-laisse-partir";
  const OFFSET = 0;

  const LYRICS = [
    ["0:11.0", "Luulen, että olen odottanut tarpeeksi kauan.", "Acho que já esperei tempo suficiente."],
    ["0:16.0", "Ajattelin pitkään, että palaisit vielä.", "Durante muito tempo pensei que voltarias."],
    ["0:21.0", "Että hiljaisuus joskus särkyisi.", "Que o silêncio acabaria por se quebrar."],
    ["0:27.0", "Mutta tänään,", "Mas hoje,"],
    ["0:31.0", "luulen, että ymmärrän.", "acho que finalmente compreendo."],
    ["0:37.0", "Säilytin muistomme jossain,", "Guardei as nossas memórias algures,"],
    ["0:41.0", "paikassa, jota en enää juuri avaa.", "Num lugar que já quase não abro."],
    ["0:45.0", "Jäljellä on sanoja ja katseita,", "Restam palavras e alguns olhares,"],
    ["0:48.0", "hetkiä, joita en koskaan kadota.", "Momentos que nunca vou perder."],
    ["0:53.0", "Mietin joskus, mitä sinulle kuuluu,", "Às vezes pergunto-me como estarás,"],
    ["0:56.0", "hymyiletkö, onko kaikki paremmin.", "Se sorris, se tudo está melhor."],
    ["1:00.0", "Kulkevatko tiemme vielä jossain ristiin, vai olenko enää vain muisto silmissäsi?", "Se os nossos caminhos ainda se cruzam por aí, Ou se sou apenas uma lembrança para ti."],
    ["1:09.0", "Olisinpa voinut tehdä toisin,", "Quem me dera ter feito diferente,"],
    ["1:12.0", "löytää oikeat sanat oikeaan aikaan.", "Ter encontrado as palavras no momento certo."],
    ["1:15.0", "Mutta vuodenaikoja ei voi pidättää, eikä kaikkia teitä voi korjata.", "Mas não podemos parar as estações, Nem consertar todos os caminhos."],
    ["1:23.0", "Niin päästän sinut menemään,", "Então deixo-te partir,"],
    ["1:27.0", "vaikka se yhä sattuu sydämessäni. En enää odota paluutasi, en etsi ääntäsi hiljaisuudesta.", "Mesmo que ainda me doa no coração. Já não vou esperar que voltes, Nem procurar a tua voz no silêncio."],
    ["1:37.0", "Sinulla oli paikkasi elämässäni, en kadu sitä, mitä koimme. Vaikka tiemme kulkevat nyt eivätkä enää koskaan kohtaa. Päästän sinut menemään... mutten unohda.", "Tiveste um lugar na minha vida, E não me arrependo do que vivemos. Mesmo que hoje os nossos caminhos Já não voltem a cruzar-se. Deixo-te partir... Mas não vou esquecer."],
    ["2:08.0", "Joskus halusin aloittaa alusta, kuin mitään ei olisi koskaan särkynyt. Kuvittelin, kuinka kohtaisimme jälleen, pyytäisimme anteeksi ja nauraisimme. Mutta vuodet muuttivat kasvojamme, ja hiljaisuus vei liikaa tilaa.", "Por vezes quis começar de novo, Como se nada tivesse sido quebrado. Imaginei como seria voltar a encontrar-te, Pediríamos desculpa e voltaríamos a rir. Mas os anos mudaram os nossos rostos, E o silêncio ocupou demasiado espaço."],
    ["2:29.0", "En halua enää elää sivulla, joka hitaasti haalistuu pois.", "Já não quero viver noutra página De uma história que lentamente desaparece."],
    ["2:34.0", "Ehkä jonain päivänä sattumalta tunnistamme toisemme katseesta.", "Talvez um dia, por acaso, Nos reconheçamos num olhar."],
    ["2:41.0", "Puhumme kuin kaksi vierasta,", "Falaremos como dois desconhecidos,"],
    ["2:44.0", "mutta lempeydellä, jonka yhteinen aika jätti.", "Com a ternura que o tempo que partilhámos deixou."],
    ["2:49.0", "Niin päästän sinut menemään,", "Então deixo-te partir,"],
    ["2:53.0", "vaikka se yhä sattuu sydämessäni.", "Mesmo que ainda me doa no coração."],
    ["2:56.0", "En enää odota paluutasi, en etsi ääntäsi hiljaisuudesta.", "Já não vou esperar que voltes, Nem procurar a tua voz no silêncio."],
    ["3:03.0", "Sinulla oli paikkasi elämässäni, en kadu sitä, mitä koimme. Vaikka tiemme kulkevat nyt eivätkä enää koskaan kohtaa. Päästän sinut menemään...", "Tiveste um lugar na minha vida, E não me arrependo do que vivemos. Mesmo que hoje os nossos caminhos Já não voltem a cruzar-se. Deixo-te partir..."],
    ["3:24.0", "mutten unohda.", "Mas não vou esquecer."],
    ["3:28.0", "Tiedäthän... Ehkä vaikeinta ei ole menettää jotakuta.", "Sabes... Talvez o mais difícil não seja perder alguém."],
    ["3:37.0", "Vaan ymmärtää, ettemme koskaan enää löydä sitä ihmistä, joka hän ennen oli.", "Mas compreender Que nunca mais vamos encontrar a pessoa que essa pessoa era antes."],
    ["3:45.0", "Ehkä minäkin olen muuttunut.", "Talvez eu também tenha mudado."],
    ["3:49.0", "En syytä sinua.", "Não te culpo."],
    ["3:51.0", "En enää syytä itseänikään niin paljon. Olisin vain toivonut, että tarinamme olisi kestänyt hieman kauemmin.", "E já não me culpo tanto. Só gostava que a nossa história tivesse durado um pouco mais."],
    ["3:58.0", "Niin päästän sinut menemään, minun ei tarvitse enää pidätellä sinua. Säilytän kaikki kauniit päivät, vaikka ne ovat nyt hiljaisuutta.", "Então deixo-te partir, Já não preciso de te impedir de partir. Vou guardar os dias felizes, Mesmo que agora sejam silêncio."],
    ["4:12.0", "Kiitos, että kuljit kanssani. että olit siinä, vaikka vain hetken. Säilytän, epäilyksistä huolimatta, palasen meitä", "Obrigado por teres caminhado comigo. Por teres estado lá, mesmo que só por um instante. Vou guardar, apesar das dúvidas, Um pouco de nós"],
    ["4:25.0", "ajassa. Ja jos joskus ajattelet minua, toivon, että se on ilman katumusta. Sillä vaikka et enää ole täällä, olen onnellinen, että tunsin sinut. En odota sinua enää. En etsi sinua enää. Mutta jossain,", "no tempo. E se alguma vez pensares em mim, Espero que seja sem arrependimento. Porque mesmo que já não estejas aqui, Fico feliz por te ter conhecido. Já não te espero. Já não te procuro. Mas algures,"],
    ["4:56.0", "muistossa... olet aina ollut olemassa.", "Numa lembrança... Terás sempre existido."],
    ["5:03.0", "Hyvästi.", "Adeus."]
  ];

  const audio = document.getElementById(`audio-${TRACK_ID}`);
  const panel = document.getElementById("lyrics-panel");
  const box = document.getElementById("lyrics-box");
  if (!audio || !panel || !box) return;

  const toSeconds = t => {
    const [m, s] = t.split(":").map(Number);
    return m * 60 + s;
  };

  const lines = LYRICS.map(([time, fi, pt]) => {
    const start = toSeconds(time);
    const p = document.createElement("p");
    p.className = "lyric-line";
    p.dataset.time = String(start);
    const spanFi = document.createElement("span");
    spanFi.className = "l-fi";
    spanFi.lang = "fi";
    spanFi.textContent = fi;
    const spanPt = document.createElement("span");
    spanPt.className = "l-pt";
    spanPt.lang = "pt";
    spanPt.textContent = pt;
    p.append(spanFi, spanPt);
    p.addEventListener("click", () => {
      audio.currentTime = Math.max(0, start - OFFSET);
      const attempt = audio.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => audio.dispatchEvent(new Event("play-failed")));
      }
    });
    box.appendChild(p);
    return { start, el: p };
  });

  let activeIndex = -1;
  let manualUntil = 0;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function centerOn(el, smooth) {
    const top = el.offsetTop - box.clientHeight / 2 + el.clientHeight / 2;
    const behavior = smooth && !reduceMotion.matches ? "smooth" : "auto";
    box.scrollTo({ top, behavior });
  }

  function sync(forceScroll) {
    const now = audio.currentTime + OFFSET;
    let index = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].start <= now) index = i; else break;
    }
    if (index !== activeIndex) {
      if (activeIndex >= 0) lines[activeIndex].el.classList.remove("is-active");
      activeIndex = index;
      if (index >= 0) lines[index].el.classList.add("is-active");
      forceScroll = true;
    }
    if (forceScroll && activeIndex >= 0 && Date.now() > manualUntil) {
      centerOn(lines[activeIndex].el, true);
    }
  }

  ["timeupdate", "seeked", "loadedmetadata"].forEach(ev => audio.addEventListener(ev, () => sync(false)));

  // Si le visiteur fait défiler lui-même, on laisse le défilement automatique en pause quelques secondes.
  // Un clic sur une ligne sert à sauter dans la chanson : on ne bloque pas le recentrage.
  function holdAutoScroll(event) {
    if (event && event.target.closest(".lyric-line")) return;
    manualUntil = Date.now() + 3500;
  }
  box.addEventListener("wheel", () => holdAutoScroll(), { passive: true });
  ["touchstart", "pointerdown"].forEach(ev =>
    box.addEventListener(ev, holdAutoScroll, { passive: true })
  );

  // Switch finnois / portugais
  const buttons = panel.querySelectorAll(".lang-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (panel.dataset.lang === lang) return;
      box.classList.add("is-switching");
      setTimeout(() => {
        panel.dataset.lang = lang;
        buttons.forEach(b => {
          const on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", String(on));
        });
        if (activeIndex >= 0) centerOn(lines[activeIndex].el, false);
        box.classList.remove("is-switching");
      }, 160);
    });
  });
})();
