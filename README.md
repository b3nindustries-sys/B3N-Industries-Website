# B3N Industries Website

Static, responsive company website for [b3nindustries.com](https://b3nindustries.com). No build step, backend, cookies or analytics are required.

## Pages

- `index.html` — company positioning and primary conversion page
- `services.html` — engineering and product development services
- `products.html` — FOCUS and B3N product development programs
- `focus.html` / `focus.css` / `focus.js` — dedicated FOCUS Wallet page with the technical-drawing presentation and draggable product render
- `bench.html` — standalone BENCH measurement comparison page, supplied by Kyle; its styling, reference data and behavior are self-contained
- `spaces.html` — SPACES 360° virtual tour service with an embedded Kim Apt 1 example
- `projects.html` — selected work and research programs
- `about.html` — company profile, search-focused service context and a collapsible Kyle Bennett founder card linked to `kylebrbennett.com`
- `contact.html` — project inquiry information and direct email

## Search foundations

Every public page has a unique title, description, canonical URL and social-sharing metadata. The homepage establishes the B3N Industries organization and founder relationship in JSON-LD; relevant interior pages describe their page, person, service, product or app entity. `sitemap.xml` lists the nine public URLs and `robots.txt` advertises the sitemap.

Canonical and sitemap URLs match the static `.html` filenames, so the search signals point to the same paths that a manual or GitHub Pages upload reliably serves.

## Manual upload

Upload the contents of this folder—not the containing folder—to the repository root. Keep the file and folder names unchanged. GitHub Pages can serve the `.html` links directly.

After deploying:

1. Confirm `https://b3nindustries.com/` loads over HTTPS.
2. Test all nine public pages on desktop and mobile, including the FOCUS drawing interaction and BENCH calculations.
3. Confirm `https://b3nindustries.com/sitemap.xml` and `/robots.txt` load.
4. Submit the sitemap in Google Search Console.
5. When Kyle's personal site has a confirmed production URL, add deliberate reciprocal links between its founder profile and `about.html`; do not invent or redirect a placeholder domain.

The founder page uses a visible business-card layout with Kyle Bennett's name, role, contact details and B3N logo in HTML. Its `ProfilePage` and `Person` data uses the same founder ID as the homepage `Organization` record. When the separate portfolio and verified LinkedIn/social profiles are live, add their exact URLs as visible links and matching `sameAs` values on the Person record. Give the personal portfolio its own distinct writing and canonical URL; keep this company profile focused on Kyle's role at B3N.

## Accessibility and behavior

- Semantic headings, landmarks, skip links and visible keyboard focus are included.
- Navigation remains visible without JavaScript; JavaScript enhances it into a mobile menu.
- The industrial signal-orange palette is the default; visitors can switch to engineering blue, and their choice is stored locally in the browser.
- Motion is reduced for visitors who request reduced motion.

Primary contact: `hello@b3nindustries.com`.

BENCH runs entirely on the visitor's device. Its "I have a number" interpreter accepts a measurement with its unit; the separate reference search finds familiar comparisons across length, time, power and water. `bench.js` is an unused legacy implementation and is not loaded by the supplied page. SPACES is offered as a bookable service through email; this repository does not contain the separate tour viewer/editor or a public sample tour, so the site does not present one as a live demo.
