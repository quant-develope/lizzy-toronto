(function () {
  'use strict';
  var dl = (window.dataLayer = window.dataLayer || []);

  // Fade sections in as they scroll into view
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    document.documentElement.classList.add('js');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  // Menu
  var menu = document.getElementById('site-menu');
  var toggle = document.querySelector('.menu-toggle');
  function setMenu(open) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (open) menu.querySelector('.menu-close').focus();
  }
  toggle.addEventListener('click', function () { setMenu(true); });
  menu.addEventListener('click', function (e) {
    if (e.target === menu || e.target.closest('.menu-close') || e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); }
  });

  // Click tracking for Google Ads / GA4 via GTM
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-track]');
    if (el) dl.push({ event: el.getAttribute('data-track'), link_location: el.className || 'link' });
  });

  // Bottom bar: hidden while the hero or final "Get a free quote" button is on screen,
  // slides up once the visitor has scrolled past the hero button
  var bar = document.querySelector('.sticky-cta');
  var heroBtn = document.querySelector('.hero .btn-glass');
  if (bar && heroBtn && 'IntersectionObserver' in window) {
    var onScreen = [];
    var updateBar = function () {
      var past = heroBtn.getBoundingClientRect().bottom < 0;
      bar.classList.toggle('show', past && onScreen.length === 0);
    };
    var barIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var i = onScreen.indexOf(en.target);
        if (en.isIntersecting && i < 0) onScreen.push(en.target);
        if (!en.isIntersecting && i >= 0) onScreen.splice(i, 1);
      });
      updateBar();
    });
    document.querySelectorAll('.hero .btn-glass, .final-cta .btn-glass').forEach(function (el) { barIO.observe(el); });
    document.documentElement.classList.add('bar-auto');
  }

  // Keep ad click IDs and UTM params for the session so they reach the form
  var params = new URLSearchParams(location.search);
  var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'gclid'];
  var store = {};
  try { store = JSON.parse(sessionStorage.getItem('attr') || '{}'); } catch (err) {}
  keys.forEach(function (k) { if (params.get(k)) store[k] = params.get(k); });
  try { sessionStorage.setItem('attr', JSON.stringify(store)); } catch (err) {}

  var form = document.querySelector('.lead-form');
  if (!form) return;
  keys.forEach(function (k) { if (store[k] && form.elements[k]) form.elements[k].value = store[k]; });
  form.elements.page.value = location.pathname;

  var status = form.querySelector('.form-status');
  var started = false;
  form.addEventListener('input', function () {
    if (!started) { started = true; dl.push({ event: 'form_start' }); }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'form-status';
    var bad = null;
    ['name', 'phone', 'city', 'service'].forEach(function (n) {
      var f = form.elements[n];
      var ok = f.value.trim() !== '' && (n !== 'phone' || f.value.replace(/\D/g, '').length >= 10);
      f.classList.toggle('invalid', !ok);
      if (!ok && !bad) bad = f;
    });
    var email = form.elements.email;
    if (email.value && !email.checkValidity()) { email.classList.add('invalid'); bad = bad || email; }
    if (bad) {
      status.textContent = 'Please fill in your name, a 10-digit phone number, city and service.';
      status.classList.add('error');
      bad.focus();
      return;
    }

    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || !res.d.ok) throw new Error([res.d.error || 'Request failed', res.d.detail].filter(Boolean).join(': '));
        location.href = '/thank-you/';
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = 'Get my free quote';
        status.innerHTML = 'Something went wrong. Please call us at <a href="' + document.querySelector('.header-phone').getAttribute('href') + '">' +
          document.querySelector('.header-phone span').textContent + '</a>.';
        status.classList.add('error');
      });
  });
})();
