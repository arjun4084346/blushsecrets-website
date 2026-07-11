# Blush Secrets — Website

A fast, free static rebuild of eyebrowthreadingandmakeup.com. No monthly hosting fee — runs on GitHub Pages.
Booking links out to your existing Square Appointments page, so nothing about bookings changes.

## Pages
- `index.html` — Home
- `services.html` — Menu & price list
- `portfolio.html` — Videos (photo galleries to be added)
- `updates.html` — Announcements (edit the "notice" block to post updates)
- `appointment.html` — Redirects to Square booking (keeps old /appointment link working;
  marked `noindex` and left out of `sitemap.xml` on purpose — it's just a redirect stub)
- `contact.html` — Contact info + message form (see "Contact form" below)
- `privacy.html`, `terms.html` — Legal pages (with the SMS clause Twilio needs)
- `assets/style.css` — Shared styling
- `CNAME` — Tells GitHub Pages to serve the site at eyebrowthreadingandmakeup.com

## Contact form
There is currently **no hosted form backend**. The original build posted to
`https://formspree.io/f/YOUR_FORM_ID` — a placeholder that was never replaced, so any
submission would have been silently lost. The form now works without any service: the
**Send as text (SMS)** button opens the visitor's messaging app with the message pre-filled
for 408-314-3670, and **Send on WhatsApp** does the same via wa.me (works on desktop too).
No email fallback exists because the site has no business email address anywhere.

To switch back to a hosted form later: create a form at https://formspree.io (or use a
Square contact form) and follow the comment above the `<form>` in `contact.html` — set the
form's `action` to the real endpoint, restore the single `Send` submit button, and delete
the `contactVia()` script.

## Google reviews widget (Featurable)
The homepage "Reviews" section shows a live Google Reviews carousel powered by
[Featurable](https://featurable.com) (free plan), which auto-syncs from Richa's Google
Business Profile — new reviews appear automatically, newest first, with no code change.
The embed lives in `index.html` in the Reviews section: a
`<div id="featurable-…" data-featurable-async></div>` plus Featurable's `bundle.js` script.
To change the layout, sort order, or minimum-rating filter, edit the widget in the
Featurable dashboard (nothing to redeploy). To swap providers, replace that div + script.

## Legal-page copies in `../website-legal/`
`../website-legal/` holds standalone copies of the privacy/terms text (handy for pasting
into Square/Twilio SMS-campaign registration). They are **generated from** `privacy.html`
and `terms.html` here — the website pages are the canonical versions. If you change the
legal text, edit the website pages first, then refresh the copies.

## Deploy (I do this once GitHub is connected)
> Note: this local repo currently has **no git remote**. Once the GitHub Pages repo
> exists, connect it (`git remote add origin <repo URL>`) and make `git push` the single
> deploy path — do not deploy by uploading zips, they go stale.
1. Create a repo (e.g. `blushsecrets-site`) and push these files.
2. Repo → Settings → Pages → Source: `main` branch, root folder.
3. GitHub Pages goes live at `https://<user>.github.io/...`, then the custom domain (below).

## Point eyebrowthreadingandmakeup.com to GitHub Pages (done in Cloudflare DNS)
In Cloudflare → your domain → **DNS → Records**, set (all records **DNS only / grey cloud**, not proxied):
- Four **A** records for `@` →
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- Four **AAAA** records for `@` →
  `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
- One **CNAME** record for `www` → `arjun4084346.github.io`

The `CNAME` file in this repo already tells GitHub Pages the custom domain. After DNS
resolves, GitHub Pages settings will show the domain; then enable **Enforce HTTPS**.
DNS changes can take a few minutes to a few hours to take effect.

> Keep the records **DNS only** (grey cloud) at least until GitHub has issued the HTTPS
> certificate — Cloudflare's proxy can otherwise block GitHub's cert provisioning.

## To update text/photos later
Edit the relevant `.html` file (or ask me). For photos, drop image files into `assets/`
and reference them, e.g. `<img src="assets/brows1.jpg" alt="...">`.
