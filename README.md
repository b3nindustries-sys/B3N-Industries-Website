# B3n Industries - Official Website

A lightweight, responsive brochure site for B3n Industries. It introduces the studio, states the
core vision, and documents the first product currently in development.

**Live URL:** [https://b3nindustries.com](https://b3nindustries.com)

---

## 1. Project Overview
Three static pages, built around the Aug 2026 brand artwork:
* **index.html** — hero with the prototype drawing plate, signal band and closing call.
* **contact.html** — mail-only contact sheet, laid out to fit a single viewport (no forms, no
  tracking, no scrolling).
* Fully responsive across mobile, tablet and desktop viewports.

### Design system — "Technical Control Document"
The site is presented as the engineering document behind the product:
* Ink ground (`#0b0c0e`) with a drafting grid, film grain and a warm signal glow.
* Silver hairlines, mono annotations, dimension lines and document/revision numbers.
* One hot accent — brand orange `#e57224` — against the brand blue `#365fab`.
* Type: **Archivo** (variable, expanded/heavy) for display, **IBM Plex Mono** for annotation,
  **IBM Plex Sans** for body copy.

Brand colours are defined once as CSS custom properties at the top of `stylesheet.css`:
blue `#365fab`, orange `#e57224`, teal `#116e6b`, slate `#40576b`, silver `#a7a9ac`,
black `#221f1f`.

### Two palettes
The nav carries a swatch button that switches the whole site between two accents, both taken
from the logo set:

| Palette | Accent | Signal band | Notes |
| --- | --- | --- | --- |
| Signal (default) | orange `#e57224` | `images/background-candidate1.png` | black type on the band |
| Blue | blue `#365fab` | `images/background2.png` | bone type on the band, for contrast |

Everything themeable routes through `--accent`, `--accent-ink`, `--accent-wash` and the glow
tokens; the blue overrides live in one `[data-theme="blue"]` block. The choice is stored in
`localStorage` under `b3n-theme` and re-applied by a two-line inline script in `<head>`, so
there is no flash of the wrong palette on load or when moving between pages.

---

## 2. Tech Stack
Built entirely using standard web technologies:
* **HTML5** — semantic markup for structure and SEO accessibility.
* **CSS3** — custom layouts, typography, responsive styling and all motion.

* **JavaScript** — one small file, `script.js` (no dependencies, no build step), doing two
  things: the palette switch in the nav, and letting you pick the prototype up off the drawing
  plate with the mouse and drop it so it springs back. If the script never loads, the page
  renders in the default palette and is otherwise unaffected.
* No backend environment variables or databases required.
* No user tracking, cookies, or live data processing implemented (privacy-first).
* All other motion is CSS-only. Scroll reveals use `animation-timeline: view()` behind an
  `@supports` guard, so browsers without scroll-driven animations simply render the content —
  nothing is ever hidden behind a script.
* `prefers-reduced-motion` is respected throughout.

---

## 3. Project Structure

```text
├── images/
│   ├── brand/                        # Logo set, vectorised from the Aug 2026 TCD PDFs
│   │   ├── b3n-logo-silver.svg/.png  # Blue B + silver N + tagline
│   │   ├── b3n-logo-orange.svg/.png  # Blue B + signal-orange N + tagline
│   │   ├── b3n-logo-teal.svg/.png    # Blue B + teal N + tagline
│   │   ├── b3n-logo-slate.svg/.png   # Blue B + slate N + tagline
│   │   ├── b3n-logo-black.svg/.png   # Mono lockup, no tagline
│   │   ├── b3n-logo-onink.svg        # Derived: light-on-dark lockup
│   │   ├── b3n-mark-bone.svg         # Derived: bone monogram (nav, footer, favicon)
│   │   └── b3n-type-specimen.svg/.png# Tagline typeface options
│   ├── background-candidate1.png     # Orange wall texture (signal palette band)
│   ├── background2.png               # Blue wall texture (blue palette band)
│   └── grain.svg                     # Film-grain overlay tile
├── contact.html          # Contact sheet — TCD-003
├── index.html            # Main landing page — TCD-001
├── README.md             # This documentation file
├── robots.txt            # Search engine crawler guidance
├── script.js             # Drag-and-release interaction for the drawing plate
└── stylesheet.css        # Design system, layout and motion
```

---

## 4. Placeholders to replace
Copy that stands in for information not yet supplied:
* `hello@b3nindustries.com` — used in the footer and every contact link.
* The stat-rail figures (layer height, mass, capacity) are prototype targets and should be
  replaced with measured values before release.
