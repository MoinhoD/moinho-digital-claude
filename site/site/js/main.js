/* ============================================================
   MOINHO DIGITAL — comportamento do site
   Tudo respeita prefers-reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. NAV: sombra ao rolar + menu mobile ---------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');

  function aoRolar() {
    nav.classList.toggle('is-stuck', window.scrollY > 12);
  }
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });

  burger.addEventListener('click', function () {
    var aberto = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!aberto));
    burger.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
    menu.classList.toggle('is-open', !aberto);
  });

  // fecha o menu ao clicar num link
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menu');
      menu.classList.remove('is-open');
    }
  });

  /* ---------- 2. REVEAL: entrada dos blocos ---------- */
  var alvos = document.querySelectorAll('.rv, .rv-mask');

  if (semMovimento || !('IntersectionObserver' in window)) {
    alvos.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add('is-in');
        obs.unobserve(entrada.target);          // anima uma vez so
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    alvos.forEach(function (el) { obs.observe(el); });

    // Rede de seguranca: o observer sozinho falha quando a pagina abre num
    // ancora ou o usuario rola muito rapido. Aqui revelamos, sem animar, tudo
    // que ja passou pela viewport, para nunca sobrar bloco invisivel.
    function revelarPassados() {
      alvos.forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95) {
          el.classList.add('is-in');
          obs.unobserve(el);
        }
      });
    }
    window.addEventListener('load', revelarPassados);
    setTimeout(revelarPassados, 400);
  }

  /* ---------- 3. CONTADOR dos números de credibilidade ---------- */
  var numeros = document.querySelectorAll('[data-count]');

  function contar(el) {
    var alvo = parseFloat(el.dataset.count);
    var prefixo = el.dataset.prefix || '';
    var sufixo = el.dataset.suffix || '';
    var dur = 2000;
    var t0 = null;

    function passo(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 4);          // ease-out quártico, freia mais no fim
      el.textContent = prefixo + Math.round(alvo * eased) + sufixo;
      if (p < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  if (!semMovimento && 'IntersectionObserver' in window) {
    var obsNum = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        contar(entrada.target);
        obsNum.unobserve(entrada.target);
      });
    }, { threshold: 0.9, rootMargin: '0px 0px -30% 0px' });

    numeros.forEach(function (el) {
      var prefixo = el.dataset.prefix || '';
      var sufixo = el.dataset.suffix || '';
      el.textContent = prefixo + '0' + sufixo;     // parte do zero
      obsNum.observe(el);
    });
  }

  /* ---------- 4. CARROSSEL de depoimentos ---------- */
  var track = document.getElementById('depTrack');
  var prev = document.getElementById('depPrev');
  var next = document.getElementById('depNext');
  var dots = document.getElementById('depDots');

  if (track && prev && next) {
    var dep = track.closest('.dep');
    var cards = track.querySelectorAll('.dep__card');
    var timer = null;
    var pausado = false;

    function passoCarrossel() {
      var card = cards[0];
      if (!card) return 320;
      var gap = parseFloat(getComputedStyle(track).columnGap || 20);
      return card.getBoundingClientRect().width + gap;
    }

    // Quantos cards cabem de uma vez. A largura do card vem de uma conta no CSS,
    // então essa divisão dá 3, 2 ou 1 conforme o breakpoint.
    function porPagina() {
      return Math.max(1, Math.round(track.clientWidth / passoCarrossel()));
    }
    function totalPaginas() {
      return Math.max(1, Math.ceil(cards.length / porPagina()));
    }
    function paginaAtual() {
      var largura = passoCarrossel() * porPagina();
      return Math.min(totalPaginas() - 1, Math.round(track.scrollLeft / largura));
    }
    function irPara(i) {
      var max = track.scrollWidth - track.clientWidth;
      var alvo = Math.max(0, Math.min(max, i * passoCarrossel() * porPagina()));
      track.scrollTo({ left: alvo, behavior: semMovimento ? 'auto' : 'smooth' });
    }
    // as setas dão a volta em vez de morrer nos extremos
    function mover(dir) {
      var n = totalPaginas();
      var i = paginaAtual() + dir;
      if (i >= n) i = 0;
      if (i < 0) i = n - 1;
      irPara(i);
    }

    prev.addEventListener('click', function () { mover(-1); reiniciar(); });
    next.addEventListener('click', function () { mover(1); reiniciar(); });

    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); mover(1); reiniciar(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); mover(-1); reiniciar(); }
    });

    /* pontinhos: uma marca por página */
    function montarDots() {
      if (!dots) return;
      var n = totalPaginas();
      if (dots.childElementCount === n) return;
      dots.innerHTML = '';
      for (var i = 0; i < n; i++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'dep__dot';
        b.dataset.i = i;
        b.setAttribute('aria-label', 'Ver depoimentos ' + (i + 1) + ' de ' + n);
        dots.appendChild(b);
      }
    }
    function marcarDot() {
      if (!dots) return;
      var a = paginaAtual();
      Array.prototype.forEach.call(dots.children, function (b, i) {
        b.classList.toggle('is-on', i === a);
        if (i === a) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      });
    }
    if (dots) {
      dots.addEventListener('click', function (e) {
        var b = e.target.closest('.dep__dot');
        if (!b) return;
        irPara(parseInt(b.dataset.i, 10));
        reiniciar();
      });
    }

    /* rotação automática: para no hover, no foco e no toque, e volta depois */
    function avancar() { if (!pausado) mover(1); }
    function reiniciar() {
      clearInterval(timer);
      if (!semMovimento && totalPaginas() > 1) timer = setInterval(avancar, 6500);
    }
    if (dep) {
      ['pointerenter', 'focusin'].forEach(function (ev) {
        dep.addEventListener(ev, function () { pausado = true; });
      });
      ['pointerleave', 'focusout'].forEach(function (ev) {
        dep.addEventListener(ev, function () { pausado = false; });
      });
      dep.addEventListener('touchstart', function () { pausado = true; }, { passive: true });
      dep.addEventListener('touchend', function () {
        setTimeout(function () { pausado = false; }, 6000);
      }, { passive: true });
    }

    track.addEventListener('scroll', marcarDot, { passive: true });
    window.addEventListener('resize', function () { montarDots(); marcarDot(); reiniciar(); });
    montarDots(); marcarDot(); reiniciar();
  }


  /* ---------- 6. GRAVATA BORBOLETA: detalhe de cada etapa ---------- */
  var bt = document.querySelector('.bt');

  if (bt) {
    var etapas = bt.querySelectorAll('.bt__et');
    var paineis = bt.querySelectorAll('.bt__painel');

    function abrirEtapa(chave) {
      etapas.forEach(function (b) {
        var ligado = b.dataset.et === chave;
        b.classList.toggle('is-on', ligado);
        b.setAttribute('aria-expanded', String(ligado));
      });
      paineis.forEach(function (p) {
        p.classList.toggle('is-on', p.dataset.et === chave);
      });
    }

    etapas.forEach(function (b) {
      ['mouseenter', 'focus', 'click'].forEach(function (ev) {
        b.addEventListener(ev, function () { abrirEtapa(b.dataset.et); });
      });
    });
  }

  /* ---------- 5. FORMULÁRIO ---------- */
  var form = document.getElementById('formContato');
  var msg = document.getElementById('formMsg');

  if (form && msg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var botao = form.querySelector('button[type="submit"]');
      var textoOriginal = botao.textContent;

      botao.disabled = true;
      botao.textContent = 'Enviando...';
      msg.className = 'form-msg';
      msg.textContent = '';

      // O action do <form> e o endpoint normal do FormSubmit, que serve de
      // fallback se o JS nao rodar (o navegador posta e cai na pagina de obrigado).
      // Para o envio por fetch existe o endpoint /ajax/, que devolve JSON e manda
      // os cabecalhos de CORS. Sem ele o fetch quebra em CORS mesmo com o e-mail
      // tendo sido entregue, e a pagina mostraria erro num envio que deu certo.
      var destino = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

      fetch(destino, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d || String(d.success) !== 'true') throw new Error('falha no envio');
          form.reset();
          msg.className = 'form-msg ok';
          msg.textContent = 'Recebemos sua mensagem. Retornamos em até um dia útil.';
        })
        .catch(function () {
          msg.className = 'form-msg erro';
          msg.innerHTML = 'Não conseguimos enviar agora. Escreva para ' +
            '<a href="mailto:contato@moinhod.com.br">contato@moinhod.com.br</a> ' +
            'ou chame no WhatsApp.';
        })
        .finally(function () {
          botao.disabled = false;
          botao.textContent = textoOriginal;
        });
    });
  }
})();
