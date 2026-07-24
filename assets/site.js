/* Open off-site links in a new tab so visitors don't lose the site.
   Internal (same-host) and relative links are left untouched. */
(function () {
  var host = location.hostname;
  var anchors = document.getElementsByTagName('a');
  for (var i = 0; i < anchors.length; i++) {
    var a = anchors[i];
    var href = a.getAttribute('href');
    if (!href || !/^https?:\/\//i.test(href)) continue; // skip relative, tel:, mailto:
    try {
      if (new URL(href, location.href).hostname !== host) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
    } catch (e) { /* malformed URL — leave as-is */ }
  }
})();

/* Live Google review count + rating, pulled from the Featurable widget API.
   The numbers in the HTML act as a fallback if the request fails or JS is off. */
(function () {
  if (!document.querySelector('[data-review-count],[data-review-rating]')) return;
  fetch('https://api.featurable.com/v1/widgets/d2a18437-1b02-4cb6-8a84-afdbd6755f6d')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      if (!d) return;
      if (d.totalReviewCount) {
        var n = String(d.totalReviewCount);
        [].forEach.call(document.querySelectorAll('[data-review-count]'), function (el) { el.textContent = n; });
      }
      if (typeof d.averageRating === 'number') {
        var avg = d.averageRating.toFixed(1);
        [].forEach.call(document.querySelectorAll('[data-review-rating]'), function (el) { el.textContent = avg; });
      }
    })
    .catch(function () { /* keep the static fallback */ });
})();

/* Lazy-load the Featurable reviews widget: the third-party bundle is only fetched
   once the reviews section nears the viewport, keeping it off the critical path.
   The review count/rating above is independent — it calls the API directly. */
(function () {
  var host = document.querySelector('[data-featurable-async]');
  if (!host) return;
  var loaded = false;
  function load() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.src = 'https://featurable.com/assets/bundle.js';
    s.setAttribute('charset', 'UTF-8');
    s.defer = true;
    document.body.appendChild(s);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) { load(); io.disconnect(); break; }
      }
    }, { rootMargin: '600px 0px' });
    io.observe(host);
  } else {
    load();
  }
})();
