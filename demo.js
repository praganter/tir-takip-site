(function () {
  var scene = document.getElementById('scene');
  var tryBtn = document.getElementById('try');
  var stop = document.getElementById('stop');
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  tryBtn.addEventListener('click', function () {
    scene.classList.add('gone');
    tryBtn.hidden = true;
    setTimeout(function () { scene.classList.add('ring'); stop.focus(); }, still ? 0 : 1900);
  });
  stop.addEventListener('click', function () {
    scene.classList.remove('gone', 'ring');
    tryBtn.hidden = false;
    tryBtn.focus();
  });
})();
