# Pixel Portfolio — Design Spec

**Date:** 2026-09-19
**Owner:** Isabelly Baldo ([@isabellybaldo](https://github.com/isabellybaldo))
**Status:** Approved design → ready for implementation plan

## Goal

A personal, single-page portfolio site that reads like Isabelly: **pixel-art cute on
the surface, dry and deadpan in the words.** The site is about Isabelly the
engineer/manager and the things she actually makes — not an employer highlight reel.

It ships through a **GitHub Actions CI/CD pipeline**, so the act of deploying is itself
evidence that she builds and ships. Simple now; structured to grow.

**Primary outcome:** a credible, authentic presence when someone looks her up — not job
hunting, not a resume.

## Non-goals (v1)

- No blog / writing area yet.
- No POV essays yet.
- No VPS deploy or custom-domain cutover yet (planned, see "Future").
- No analytics.
- The existing profile README (`isabellybaldo/isabellybaldo`) is **not** touched.

## Guiding principles

- **About her, not her jobs.** Work at Kateto / BTG Pactual appears as at most one light
  background line — never a section.
- **The contrast is the brand.** Sugary pixel art + deadpan copy. Keep that gap sharp.
- **Readable first.** Pixel fonts for headings/accents only; legible body font for prose.
- **Easy to keep fresh.** Content lives in data files, not buried in layout.

## Content sections (v1)

1. **Hero** — name, "Tech Manager | Engineer," a one-line deadpan tagline, pixel accent.
2. **About (short)** — a few honest sentences in her README voice. Her, not her jobs.
3. **Stuff I made** — a data-driven grid of pixel cards. v1 ships **1–2 "coming soon"
   placeholder cards** plus the section scaffolding. Real projects (`humor-do-dia`,
   `isoca_spot`) are currently **private**; cards get real links later via a one-line
   data edit when repos go public.
4. **Now** — a short, easy-to-refresh "what I'm tinkering with" line (LLMs, Claude Code,
   AWS).
5. **Find me** — LinkedIn, GitHub, (future) her own URL. Footer keeps the
   [xkcd 1319](https://xkcd.com/1319/) joke.

## Aesthetic — pixel-cute, deadpan

- **Type:** a pixel display font for headings/accents (e.g. *Press Start 2P* or
  *Silkscreen*), paired with a clean, legible body font.
- **Palette:** soft pastels — cream/off-white base, gentle pink / lavender / mint accents.
  Cute, not neon.
- **Details:** pixel-art borders on cards, one or two small sprites (possibly a tiny
  mascot), chunky pixel buttons, subtle hover states.
- **Accessibility:** adequate contrast, keyboard-focusable interactive elements, works on
  mobile.

## Technical architecture

- **Astro** static site.
- One component per section (`Hero.astro`, `About.astro`, `Projects.astro`, `Now.astro`,
  `Contact.astro`) so "expand later" means adding a component or a page.
- Content that changes (projects list, "now" text, links) lives in a small data file
  (e.g. `src/data/*.json` or `.ts`) so updates don't touch layout.
- Minimal/no client JS; ships fast as static HTML/CSS.
- Fonts loaded locally or via a font service with a fallback stack.

## CI/CD pipeline

- A GitHub Actions workflow triggered on push to `main`:
  1. Checkout
  2. Install dependencies
  3. `astro build`
  4. Deploy to **GitHub Pages** using the official Pages actions
     (`configure-pages`, `upload-pages-artifact`, `deploy-pages`).
- Green runs are visible in the Actions tab — the CI/CD story she wanted.
- **Structured for the future:** the workflow is written so a later **VPS deploy**
  (SSH/rsync) and **custom domain** (CNAME) drop in as an added job/step — no rewrite.

## Repository & deployment plan

- New repo: **`isabellybaldo.github.io`** (a GitHub *user site* → clean root URL now,
  `https://isabellybaldo.github.io`, custom domain later).
- Built locally at `C:\Users\Isabelly\PycharmProjects\isabellybaldo.github.io`.
- Isabelly creates the GitHub repo and pushes; exact commands provided during
  implementation.
- Existing profile README stays exactly as is.

## Future (post-v1)

- Flip placeholder project cards to real links once repos are public.
- Blog / writing area and POV essays.
- Deploy to her VPS and cut over to her own domain (CNAME + workflow deploy job).
- Optional analytics.
