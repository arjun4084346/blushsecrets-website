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
