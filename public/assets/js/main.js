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

  // After a tap on a call button, move this tab to the "You may be interested" page.
  // The tab never navigates while the dialer or the iOS "Call?" prompt is opening (iOS
  // reports that as "site blocked automatic call initiation"): it waits until the
  // visitor is back on the page and it has stayed on screen for a moment. The tap is
  // also remembered in sessionStorage, so the page still opens if the browser reloaded
  // the tab while the visitor was on the call. Where nothing leaves the page (desktop
  // without a phone app), it moves on after a short pause.
  var NEXT = '/interested/', KEY = 'callTapAt';
  var onNext = location.pathname === NEXT;
  var tapped = false, left = false, timer = 0;
  var markCall = function (v) { try { v ? sessionStorage.setItem(KEY, String(Date.now())) : sessionStorage.removeItem(KEY); } catch (err) {} };
  var go = function () {
    clearTimeout(timer);
    if (!tapped || document.hidden) return;
    tapped = false;
    markCall(false);
    location.href = NEXT;
  };
  var away = function () { if (tapped) { left = true; clearTimeout(timer); } };
  var back = function () { if (tapped && left && !document.hidden) { clearTimeout(timer); timer = setTimeout(go, 1200); } };
  if (onNext) markCall(false);
  else {
    document.addEventListener('click', function (e) {
      if (!e.target.closest('a[href^="tel:"]')) return;
      tapped = true; left = false;
      markCall(true);
      clearTimeout(timer);
      timer = setTimeout(function () { if (!left) go(); }, 2500);
    });
    document.addEventListener('visibilitychange', function () { document.hidden ? away() : back(); });
    window.addEventListener('blur', away);
    window.addEventListener('focus', back);
    window.addEventListener('pageshow', function () {
      var at = 0;
      try { at = +sessionStorage.getItem(KEY) || 0; } catch (err) {}
      if (at && Date.now() - at < 30 * 60 * 1000) { tapped = true; left = true; back(); }
      else markCall(false);
    });
  }

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
      status.textContent = 'We need your name, a phone number with 10 digits, your city and the job.';
      status.classList.add('error');
      bad.focus();
      return;
    }

    var btn = form.querySelector('button[type=submit]');
    btn.disabled = true;
    btn.textContent = 'One moment…';
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || !res.d.ok) throw new Error([res.d.error || 'Request failed', res.d.detail].filter(Boolean).join(': '));
        location.href = '/thank-you/';
      })
      .catch(function () {
        btn.disabled = false;
        btn.textContent = 'Send and get a price';
        status.innerHTML = 'The request did not go through. Phone us instead: <a href="' + document.querySelector('.header-phone').getAttribute('href') + '">' +
          document.querySelector('.header-phone span').textContent + '</a>.';
        status.classList.add('error');
      });
  });
})();
