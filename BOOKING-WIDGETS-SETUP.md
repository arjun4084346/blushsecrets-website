# Category booking widgets — setup

`services.html` now has a **"Book …" action under each category** (Makeup, Threading, Henna).
Right now each one falls back to a plain link to the full Square booking page. To make each
button open a booking flow limited to *just that category's services*, drop in a Square
**Advanced Widget** per category.

## Why this exists

Square's standalone booking page (`book.squareup.com/appointments/…`) shows every service as a
**flat list** — it has no setting to show category headers on that first screen (categories only
appear after the customer picks a service). Square's **Advanced Widget** is the only supported way
to present a booking flow scoped to a chosen set of services, and it embeds on any website. So we
host three of them on our own categorized page instead of sending customers to the flat list.

## Create the 3 widgets in Square (only the account owner can do this)

For each category, in the **Square Dashboard**:

1. **Appointments** (or **Payments → Appointments**) → **Online Booking** → **Advanced widget**
2. Select the location if prompted → **Create New Widget for Location**
3. Name it exactly **Makeup**, **Threading**, or **Henna**
4. Under services, include **only** that category's services (see lists below)
5. **Save**, then **Copy widget embed code** — it looks like:
   ```html
   <script src='https://square.site/appointments/buyer/widget/LOCATION_ID/WIDGET_ID.js'></script>
   ```

### Which services go in each widget

- **Makeup** — Event Makeup, Wedding Makeup, Hair Straightening, Hair Curls, Eye Makeup,
  Eye Makeup + Lash Application, Glittery Eyes
- **Threading** — Eyebrow, Upper Lip, Lower Lip, Chin, Sides, Neck, Forehead, Full Cheeks,
  Eyebrow + Upper Lip, Full Face Threading
- **Henna** — Henna Tattoo, Indigo Application on Hair

## Install the codes

In `services.html`, find the three slots marked `SQUARE BOOKING WIDGET · <CATEGORY>`.
In each slot: paste that category's embed `<script>` where the comment is, then **delete the
fallback `<a class="btn book-cat" …>` line** right below it (so you don't get two buttons).

Or just send the three embed codes to Claude and they'll be wired in.

## Notes

- The widget renders **Square's own button** and its scoped booking overlay — exact button styling
  is controlled by Square, so it may not perfectly match the site's gold buttons. It can be tuned
  once the real code is in.
- Editing a widget in Square updates it everywhere it's embedded automatically.
- If the **GoDaddy** site is the live one customers use instead of this GitHub Pages site, paste the
  same three embed codes into GoDaddy via an **HTML / embed / custom-code section**, one per
  category block.
