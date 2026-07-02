# Blush Secrets — Website

A fast, free static rebuild of blushsecrets.com. No monthly hosting fee — runs on GitHub Pages.
Booking links out to your existing Square Appointments page, so nothing about bookings changes.

## Pages
- `index.html` — Home
- `services.html` — Menu & price list
- `portfolio.html` — Videos (photo galleries to be added)
- `updates.html` — Announcements (edit the "notice" block to post updates)
- `appointment.html` — Redirects to Square booking (keeps old /appointment link working)
- `contact.html` — Contact info + message form
- `privacy.html`, `terms.html` — Legal pages (with the SMS clause Twilio needs)
- `assets/style.css` — Shared styling
- `CNAME` — Tells GitHub Pages to serve the site at blushsecrets.com

## Deploy (I do this once GitHub is connected)
1. Create a repo (e.g. `blushsecrets-site`) and push these files.
2. Repo → Settings → Pages → Source: `main` branch, root folder.
3. GitHub Pages goes live at `https://<user>.github.io/...`, then the custom domain (below).

## Point blushsecrets.com to GitHub Pages (done in GoDaddy DNS)
In GoDaddy → Domain → DNS, set:
- Four **A** records for `@` →
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- One **CNAME** record for `www` → `<user>.github.io`

Then in GitHub Pages settings, enter `blushsecrets.com` as the custom domain and enable **Enforce HTTPS**.
DNS changes can take a few minutes to a few hours to take effect.

> Keep your GoDaddy **domain registration** (cheap, ~yearly). You only cancel the GoDaddy
> **Website Builder** subscription ($21.99/mo) once the new site is verified live.

## To update text/photos later
Edit the relevant `.html` file (or ask me). For photos, drop image files into `assets/`
and reference them, e.g. `<img src="assets/brows1.jpg" alt="...">`.
