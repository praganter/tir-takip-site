(function () {
  var scene = document.getElementById('scene');
  var tryBtn = document.getElementById('try');
  var stop = document.getElementById('stop');
  var clock = document.getElementById('clock');
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var audio, beeper, timer;

  // Waiting-time readout on the phone HUD, starts mid-queue so it looks lived in.
  var waited = 2 * 3600 + 47 * 60 + 12;
  function tick() {
    var h = Math.floor(waited / 3600), m = Math.floor(waited / 60) % 60, s = waited % 60;
    clock.textContent = [h, m, s].map(function (n) { return n < 10 ? '0' + n : n; }).join(':');
    waited++;
  }
  tick();
  setInterval(tick, 1000);

  // Short alarm beeps; the click on "try" is the user gesture that unlocks audio.
  function beep() {
    var o = audio.createOscillator(), g = audio.createGain();
    o.type = 'square';
    o.frequency.value = 880;
    g.gain.setValueAtTime(.06, audio.currentTime);
    g.gain.setValueAtTime(0, audio.currentTime + .18);
    o.connect(g).connect(audio.destination);
    o.start();
    o.stop(audio.currentTime + .2);
  }
  function quiet() {
    clearInterval(beeper);
    clearTimeout(timer);
    if (navigator.vibrate) navigator.vibrate(0);
  }

  tryBtn.addEventListener('click', function () {
    try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    scene.classList.add('gone');
    tryBtn.hidden = true;
    timer = setTimeout(function () {
      scene.classList.add('ring');
      stop.focus();
      if (navigator.vibrate) navigator.vibrate([400, 200, 400, 200, 400]);
      if (audio) {
        audio.resume();
        beep();
        beeper = setInterval(beep, 350);
        // ponytail: demo stops by itself after ~4s so it never drones on in a background tab
        timer = setTimeout(function () { clearInterval(beeper); }, 4000);
      }
    }, still ? 0 : 1900);
  });
  stop.addEventListener('click', function () {
    quiet();
    scene.classList.remove('gone', 'ring');
    tryBtn.hidden = false;
    tryBtn.focus();
  });

  // Fade sections in as they scroll into view.
  if (still || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('section h2, section .intro, .steps > li, .cards > li, .places > li, .plans > li, .privacy > li, .faq details, .cta, .stats dl > div')
    .forEach(function (el) {
      el.classList.add('reveal');
      // Stagger siblings, then drop the reveal styles so hover transitions get no delay.
      el.style.transitionDelay = Math.min(Array.prototype.indexOf.call(el.parentNode.children, el), 5) * 80 + 'ms';
      el.addEventListener('transitionend', function done(e) {
        if (e.target !== el) return;
        el.removeEventListener('transitionend', done);
        el.classList.remove('reveal', 'in');
        el.style.transitionDelay = '';
      });
      io.observe(el);
    });
})();
