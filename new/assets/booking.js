/* In-site Square booking: any Square Appointments link opens the booking flow in an
   on-page modal iframe instead of navigating away. Graceful fallback — if JS is off
   or the iframe fails, the link's href still opens Square normally. */
(function () {
  var links = document.querySelectorAll('a[href*="squareup.com/appointments"]');
  if (!links.length) return;

  var modal = document.createElement('div');
  modal.className = 'booking-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML =
    '<div class="booking-modal__backdrop" data-close></div>' +
    '<div class="booking-modal__panel" role="dialog" aria-modal="true" aria-label="Book an appointment">' +
      '<div class="booking-modal__bar"><span>Book your appointment</span>' +
      '<button class="booking-modal__close" data-close aria-label="Close booking">✕</button></div>' +
      '<iframe class="booking-modal__frame" title="Book an appointment" allow="payment" ' +
        'sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox"></iframe>' +
    '</div>';
  document.body.appendChild(modal);

  var frame = modal.querySelector('.booking-modal__frame');
  var lastFocus = null;

  function open(url) {
    lastFocus = document.activeElement;
    frame.src = url;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  }
  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    setTimeout(function () { frame.removeAttribute('src'); }, 250);
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }

  modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) close(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
      e.preventDefault();
      open(this.getAttribute('href'));
    });
  }
})();
