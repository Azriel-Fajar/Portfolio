# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for **Azriel**, founder of Rielcode. Single-page scroll built on PHP + Bootstrap 5, mirroring the Rielcode visual system. Positions Azriel as the person behind the studio and showcases past Rielcode client work.

- **Local URL:** `http://localhost/Portfolio/`
- **Production:** `https://portfolio.rielcode.com/` (cPanel subdomain of rielcode.com)
- **Started:** 2026-04-27

## Stack

- **Backend:** PHP (procedural, no framework — same pattern as Rielcode)
- **Frontend:** HTML5, Bootstrap 5.3.8 (CDN), vanilla JS
- **Animation:** AOS (animate-on-scroll)
- **Fonts:** Outfit (body), Syne (display), JetBrains Mono (mono labels) — via Google Fonts
- **Icons:** Bootstrap Icons 1.11.3
- **No database, no build step.** Pure server-rendered.

## CSS load order matters

Bootstrap is loaded **before** the custom CSS in `index.php` so our overrides win cleanly. If you add a new stylesheet, put it after the Bootstrap link, not before — otherwise Bootstrap's defaults (especially `--bs-body-bg: #fff`) will override the dark theme.

## Architecture

### Page composition

`index.php` is the single entry point. It includes:

```
navbar.php
sections/hero.php
sections/about.php
sections/skills.php
sections/services.php
sections/projects.php
sections/contact.php
footer.php
```

Each section is self-contained PHP. Cards/lists that repeat (e.g. project cards) are arrays at the top of the section file and rendered via `foreach`.

### Design tokens

All colors, spacing, typography, motion, and z-index live in [CSS/root-variables.css](CSS/root-variables.css). Never hardcode a color or font in a component CSS — use the token. The accent gradient is `--gradient-accent` (cyan-blue `#3b82f6 → #06b6d4`).

### Component CSS files

| File | Owns |
|------|------|
| [CSS/style.css](CSS/style.css) | Reset, base body, hero, about, services, generic buttons, section utilities |
| [CSS/navbar.css](CSS/navbar.css) | Navbar (transparent → glass on scroll), mobile drawer |
| [CSS/skills.css](CSS/skills.css) | Skills grid + cards |
| [CSS/projects.css](CSS/projects.css) | Project grid + cards |
| [CSS/contact.css](CSS/contact.css) | Contact CTA shell + socials |
| [CSS/footer.css](CSS/footer.css) | Footer |

### JS

[JS/main.js](JS/main.js) handles AOS init (with `prefers-reduced-motion` opt-out), navbar scrolled state, mobile nav toggle, and footer year.

### SEO

Per-page meta is set by assigning `$meta_*` variables before including [inc/seo.php](inc/seo.php). Mirrors the [Rielcode/inc/seo.php](../Rielcode/inc/seo.php) pattern.

## Local dev

```bash
# XAMPP must be running. Then just browse:
http://localhost/Portfolio/
```

No build step. Edit PHP/CSS, refresh browser.

## Screenshot loop (per /frontend-design skill)

Puppeteer is installed locally for visual QA:

```bash
# Full-page screenshot (default 1440x900 viewport, fullPage)
node screenshot.mjs http://localhost/Portfolio/

# With a label
node screenshot.mjs http://localhost/Portfolio/ hero

# Custom viewport (mobile)
node screenshot.mjs http://localhost/Portfolio/ mobile 390 844
```

Outputs land in `temporary screenshots/`. The script auto-reveals AOS-animated elements (puppeteer doesn't reliably trip IntersectionObserver) and bypasses HTTP cache.

To re-grab the client thumbnails (FIT / Parallaxnet CA / SSS) from the local XAMPP versions:

```bash
node grab-client-thumbs.mjs
```

## Placeholders Azriel still needs to fill in

Search the codebase for `TODO: Azriel-supplied`:

- `IMG/azriel.jpg` — hero portrait (currently `placehold.co` fallback)
- WhatsApp number → [sections/contact.php](sections/contact.php) `wa.me/6285000000000`
- GitHub URL → [sections/contact.php](sections/contact.php) and [footer.php](footer.php)
- LinkedIn URL → same two files
- Live URLs for each project → [sections/projects.php](sections/projects.php) `link` field
- Real screenshots for Parallaxnet ID and DAAM.co.id → drop into `IMG/projects/parallaxnet-id.png` and `IMG/projects/daam.png` (current `onerror` falls back to `placehold.co`)
- Real numbers for the About stat cards → [sections/about.php](sections/about.php)

## Deploy notes

Target is `portfolio.rielcode.com`. On cPanel:
1. Create the subdomain pointing to a new directory (e.g. `/home/rier5192/portfolio.rielcode.com/`).
2. Upload everything except `node_modules/`, `temporary screenshots/`, `package.json`, `package-lock.json`, `screenshot.mjs`, and `grab-client-thumbs.mjs` (the dev tooling is local-only).
3. No DB needed — this is a static-rendered PHP site.
4. Set the GA property if Azriel wants tracking (currently unwired).

## Reuse from Rielcode

- Logo files in [IMG/](IMG/) are copies of [Rielcode/IMG/](../Rielcode/IMG/) — keep in sync if Rielcode rebrands.
- The font triplet, navbar scroll behavior, and SEO pattern all mirror Rielcode for visual consistency. If you change those there, update them here.
