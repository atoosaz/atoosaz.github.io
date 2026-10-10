(function () {
  'use strict';

  // ---- Light / dark theme toggle ----
  // Dark is the default. The choice is saved in localStorage and applied
  // before first paint by the small inline script in each page's <head>.
  var root = document.documentElement;
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'theme-toggle';
  toggle.innerHTML =
    '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/></svg>' +
    '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/></svg>';

  var applyTheme = function (theme) {
    var light = theme === 'light';
    if (light) root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
    var label = light ? 'Switch to dark mode' : 'Switch to light mode';
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    if (themeMeta) themeMeta.setAttribute('content', light ? '#f8fafc' : '#0f172a');
  };
  applyTheme(root.getAttribute('data-theme'));

  toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !still) {
      document.startViewTransition(function () { applyTheme(next); });
    } else {
      applyTheme(next);
    }
  });

  // Keep the skip link first in tab order.
  var skip = document.querySelector('.skip-link');
  document.body.insertBefore(toggle, skip ? skip.nextSibling : document.body.firstChild);

  // ---- Cursor spotlight (desktop pointers only) ----
  var spot = document.querySelector('.spotlight');
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (spot && fine.matches) {
    var raf = null, x = 0, y = 0;
    var paint = function () {
      spot.style.background =
        'radial-gradient(600px at ' + x + 'px ' + y + 'px, var(--spot), transparent 80%)';
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
