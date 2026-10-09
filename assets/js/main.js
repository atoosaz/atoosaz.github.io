(function () {
  'use strict';

  // ---- Cursor spotlight (desktop pointers only) ----
  var spot = document.querySelector('.spotlight');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (spot && fine.matches) {
    var raf = null, x = 0, y = 0;
    var paint = function () {
      spot.style.background =
        'radial-gradient(600px at ' + x + 'px ' + y + 'px, rgba(29, 78, 216, 0.15), transparent 80%)';
      raf = null;
    };
    window.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      if (!raf) raf = window.requestAnimationFrame(paint);
    }, { passive: true });
  }

  // ---- Active nav link follows scroll position ----
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  if (!links.length) return;
  var sections = links.map(function (a) {
    return document.getElementById(a.getAttribute('href').slice(1));
  });

  var setActive = function () {
    var marker = window.innerHeight * 0.35;
    var current = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i] && sections[i].getBoundingClientRect().top <= marker) current = i;
    }
    // At the very bottom, highlight the last section.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections.length - 1;
    }
    links.forEach(function (a, i) {
      a.classList.toggle('active', i === current);
      if (i === current) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  };

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(function () { setActive(); ticking = false; });
    }
  }, { passive: true });
  window.addEventListener('resize', setActive);
  setActive();
})();
