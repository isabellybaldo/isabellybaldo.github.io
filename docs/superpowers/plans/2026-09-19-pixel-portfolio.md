# Pixel Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page Astro portfolio for Isabelly Baldo — pixel-art cute on the surface, deadpan in the copy — shipped to GitHub Pages via a GitHub Actions CI/CD pipeline.

**Architecture:** Static Astro site. One component per content section, assembled in `src/pages/index.astro` on top of a shared `Base` layout. Content that changes (links, projects, "now" text) lives in typed data files under `src/data/` so updates never touch layout. Pixel aesthetic comes from a single `global.css` design system plus self-hosted `@fontsource` fonts. Deployment is a GitHub Actions workflow using the official Astro + Pages actions, written so a future VPS/custom-domain deploy drops in as an extra job.

**Tech Stack:** Astro 5, TypeScript, self-hosted fonts (`@fontsource/press-start-2p`, `@fontsource/nunito`), GitHub Actions, GitHub Pages.

**Note on testing:** This is a static content site with no runtime logic to unit-test. The verification gate for each task is: (a) `npm run build` succeeds, and (b) a `grep` against the built `dist/` HTML confirms the expected content rendered. These replace red/green unit tests and are treated as the equivalent verification.

---

## File Structure

```
isabellybaldo.github.io/
├── .github/workflows/deploy.yml     # CI/CD: build + deploy to Pages (future VPS stub)
├── .gitignore                       # node_modules, dist, .astro
├── package.json                     # deps + scripts
├── astro.config.mjs                 # site URL, output config
├── tsconfig.json                    # Astro strict TS base
├── README.md                        # what the repo is + local dev
├── public/
│   └── favicon.svg                  # pixel favicon
├── src/
│   ├── data/
│   │   ├── site.ts                  # name, tagline, about copy, links, now-line
│   │   └── projects.ts             # project cards (v1: "coming soon" placeholders)
│   ├── styles/
│   │   └── global.css               # pixel design system: palette, fonts, cards, buttons
│   ├── layouts/
│   │   └── Base.astro               # <html> shell, head, font imports, global.css
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Projects.astro
│   │   ├── Now.astro
│   │   └── Contact.astro
│   └── pages/
│       └── index.astro              # assembles all sections
```

Each data file owns "content that changes." Each component owns "how one section looks." `index.astro` owns "section order." `global.css` owns "the look." This keeps every file to one responsibility.

---

## Task 1: Scaffold the Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `src/pages/index.astro` (temporary placeholder, replaced in Task 8)

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "isabellybaldo-portfolio",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@fontsource/press-start-2p": "^5.1.0",
    "@fontsource/nunito": "^5.1.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';

// User site: served from the domain root at https://isabellybaldo.github.io
export default defineConfig({
  site: 'https://isabellybaldo.github.io',
  base: '/',
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Create `.gitignore`**

```gitignore
# build output
dist/
# generated types
.astro/
# dependencies
node_modules/
# logs
npm-debug.log*
# env
.env
.env.production
# os
.DS_Store
Thumbs.db
```

- [ ] **Step 5: Create temporary `src/pages/index.astro`**

```astro
---
// Temporary placeholder — replaced in Task 8.
---
<html lang="en">
  <head><meta charset="utf-8" /><title>Isabelly Baldo</title></head>
  <body><p>scaffold ok</p></body>
</html>
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`
Expected: completes without error; `node_modules/` and `package-lock.json` created.

- [ ] **Step 7: Verify the project builds**

Run: `npm run build`
Expected: PASS — output ends with a "Complete!" line and `dist/index.html` exists.

- [ ] **Step 8: Verify scaffold rendered**

Run (bash): `grep -q "scaffold ok" dist/index.html && echo FOUND`
Expected: prints `FOUND`.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json .gitignore src/pages/index.astro
git commit -m "chore: scaffold astro project"
```

---

## Task 2: Pixel design system (global styles)

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create `src/styles/global.css`**

```css
/* ---- Palette: soft pastels, deadpan ink ---- */
:root {
  --cream: #fdf6f0;
  --ink: #2b2b3a;
  --ink-soft: #5b5b6e;
  --pink: #ffb3c6;
  --lavender: #cdb4f6;
  --mint: #b8f2cd;
  --card: #ffffff;
  --shadow: #2b2b3a;

  --font-pixel: 'Press Start 2P', monospace;
  --font-body: 'Nunito', system-ui, sans-serif;

  --maxw: 720px;
  --step: 4px; /* pixel grid unit */
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: var(--cream);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.7;
  /* faint pixel-dot texture */
  background-image: radial-gradient(var(--lavender) 1px, transparent 1px);
  background-size: 24px 24px;
  background-attachment: fixed;
}

main {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 48px 20px 80px;
}

section { margin: 56px 0; }

h1, h2, h3 {
  font-family: var(--font-pixel);
  line-height: 1.4;
  color: var(--ink);
}

h1 { font-size: 22px; }
h2 { font-size: 15px; margin-bottom: 20px; }
h3 { font-size: 12px; }

p { margin: 0 0 16px; }

a { color: var(--ink); text-underline-offset: 3px; }
a:hover { color: var(--ink-soft); }

/* ---- Pixel card: hard stepped shadow, chunky border ---- */
.pixel-card {
  background: var(--card);
  border: var(--step) solid var(--ink);
  box-shadow: calc(var(--step) * 2) calc(var(--step) * 2) 0 0 var(--shadow);
  padding: 20px;
  border-radius: 0; /* pixels aren't round */
}

/* ---- Pixel button ---- */
.pixel-btn {
  display: inline-block;
  font-family: var(--font-pixel);
  font-size: 10px;
  text-decoration: none;
  color: var(--ink);
  background: var(--mint);
  border: var(--step) solid var(--ink);
  box-shadow: var(--step) var(--step) 0 0 var(--shadow);
  padding: 12px 16px;
  margin: 6px 8px 6px 0;
  transition: transform 80ms steps(2), box-shadow 80ms steps(2);
}
.pixel-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 0 var(--shadow);
  color: var(--ink);
}
.pixel-btn--pink { background: var(--pink); }
.pixel-btn--lav  { background: var(--lavender); }

/* ---- Small pixel tags (tech chips) ---- */
.tag {
  display: inline-block;
  font-family: var(--font-pixel);
  font-size: 8px;
  background: var(--lavender);
  border: 2px solid var(--ink);
  padding: 4px 6px;
  margin: 3px 4px 3px 0;
}

/* ---- Projects grid ---- */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.coming-soon {
  opacity: 0.85;
  border-style: dashed;
}

.muted { color: var(--ink-soft); font-size: 15px; }

footer {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 24px 20px 60px;
  font-size: 14px;
  color: var(--ink-soft);
}

/* pixel-art images render crisp, not blurry */
img.pixelated { image-rendering: pixelated; }

@media (max-width: 480px) {
  body { font-size: 17px; }
  h1 { font-size: 18px; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add pixel design system"
```

---

## Task 3: Content data files

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create `src/data/site.ts`**

Copy is deadpan and about her, not her jobs. Edit freely later.

```ts
export const site = {
  name: 'Isabelly Baldo',
  role: 'Tech Manager | Engineer',
  tagline: 'I test in production. On purpose. Usually.',
  about: [
    "I lead a small engineering team and still write the code I ask other people to write.",
    "Mostly Python, mostly on AWS, increasingly with an LLM somewhere in the loop — usually where I can keep an eye on it.",
    "This site is the cute one. My sense of humor is not.",
  ],
  now: "Right now: poking at LLMs and Claude Code, and pretending my AWS bill is a hobby.",
  tech: ['Python', 'SQL', 'React', 'Angular', 'AWS', 'Azure', 'LLMs & GenAI', 'Claude Code'],
  links: {
    github: 'https://github.com/isabellybaldo',
    linkedin: 'https://www.linkedin.com/in/isabelly-baldo-8aa527182/',
  },
  footerJoke: {
    text: 'Still think xkcd 1319 is a documentary.',
    href: 'https://xkcd.com/1319/',
  },
};
```

- [ ] **Step 2: Create `src/data/projects.ts`**

Real repos (`humor-do-dia`, `isoca_spot`) are private, so v1 ships "coming soon" placeholder cards. When a repo goes public, set `comingSoon: false` and add `href` — one line, no layout change.

```ts
export type Project = {
  title: string;
  blurb: string;
  tech: string[];
  href?: string;      // omitted while private
  comingSoon: boolean;
};

export const projects: Project[] = [
  {
    title: 'humor-do-dia',
    blurb: 'A small thing I built for me. Public version pending my nerve.',
    tech: ['JavaScript'],
    comingSoon: true,
  },
  {
    title: 'isoca_spot',
    blurb: 'Another side project living in private for now. Coming out eventually.',
    tech: ['TypeScript'],
    comingSoon: true,
  },
];
```

- [ ] **Step 3: Verify data typechecks**

Run: `npm run check`
Expected: PASS — `0 errors` (warnings about unused files are acceptable; there must be no type errors).

- [ ] **Step 4: Commit**

```bash
git add src/data/site.ts src/data/projects.ts
git commit -m "feat: add site and projects content data"
```

---

## Task 4: Base layout with fonts

**Files:**
- Create: `src/layouts/Base.astro`

- [ ] **Step 1: Create `src/layouts/Base.astro`**

```astro
---
import '@fontsource/press-start-2p/400.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}
const {
  title = 'Isabelly Baldo',
  description = 'Isabelly Baldo — Tech Manager & Engineer. Pixels on the outside, deadpan on the inside.',
} = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
  </head>
  <body>
    <main>
      <slot />
    </main>
    <slot name="footer" />
  </body>
</html>
```

- [ ] **Step 2: Verify build still passes**

Run: `npm run build`
Expected: PASS. (Layout isn't used by a page yet — this just confirms the imports resolve.)

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: add base layout with self-hosted pixel fonts"
```

---

## Task 5: Hero and About components

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/About.astro`

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
import { site } from '../data/site.ts';
---
<section id="hero" class="pixel-card">
  <h1>{site.name}</h1>
  <p class="muted">{site.role}</p>
  <p>{site.tagline}</p>
  <div>
    {site.tech.map((t) => <span class="tag">{t}</span>)}
  </div>
</section>
```

- [ ] **Step 2: Create `src/components/About.astro`**

```astro
---
import { site } from '../data/site.ts';
---
<section id="about">
  <h2>about</h2>
  {site.about.map((line) => <p>{line}</p>)}
</section>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.astro src/components/About.astro
git commit -m "feat: add hero and about components"
```

---

## Task 6: Projects, Now, and Contact components

**Files:**
- Create: `src/components/Projects.astro`
- Create: `src/components/Now.astro`
- Create: `src/components/Contact.astro`

- [ ] **Step 1: Create `src/components/Projects.astro`**

```astro
---
import { projects } from '../data/projects.ts';
---
<section id="projects">
  <h2>stuff i made</h2>
  <div class="grid">
    {projects.map((p) => (
      <div class={`pixel-card${p.comingSoon ? ' coming-soon' : ''}`}>
        <h3>{p.title}</h3>
        <p class="muted">{p.blurb}</p>
        <div>
          {p.tech.map((t) => <span class="tag">{t}</span>)}
        </div>
        {p.comingSoon
          ? <p><span class="tag">coming soon</span></p>
          : p.href && <p><a class="pixel-btn pixel-btn--pink" href={p.href}>view</a></p>}
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Create `src/components/Now.astro`**

```astro
---
import { site } from '../data/site.ts';
---
<section id="now">
  <h2>now</h2>
  <p>{site.now}</p>
</section>
```

- [ ] **Step 3: Create `src/components/Contact.astro`**

```astro
---
import { site } from '../data/site.ts';
---
<section id="contact">
  <h2>find me</h2>
  <a class="pixel-btn" href={site.links.github}>github</a>
  <a class="pixel-btn pixel-btn--lav" href={site.links.linkedin}>linkedin</a>
</section>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Projects.astro src/components/Now.astro src/components/Contact.astro
git commit -m "feat: add projects, now, and contact components"
```

---

## Task 7: Assemble the page + favicon

**Files:**
- Create: `public/favicon.svg`
- Modify: `src/pages/index.astro` (replace the Task 1 placeholder entirely)

- [ ] **Step 1: Create `public/favicon.svg`**

A tiny pixel heart in pastel pink.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">
  <rect width="16" height="16" fill="#fdf6f0"/>
  <g fill="#ffb3c6">
    <rect x="3" y="3" width="3" height="2"/>
    <rect x="10" y="3" width="3" height="2"/>
    <rect x="2" y="5" width="12" height="3"/>
    <rect x="3" y="8" width="10" height="2"/>
    <rect x="4" y="10" width="8" height="2"/>
    <rect x="6" y="12" width="4" height="1"/>
  </g>
</svg>
```

- [ ] **Step 2: Replace `src/pages/index.astro`**

Overwrite the whole file with:

```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import About from '../components/About.astro';
import Projects from '../components/Projects.astro';
import Now from '../components/Now.astro';
import Contact from '../components/Contact.astro';
import { site } from '../data/site.ts';
---
<Base>
  <Hero />
  <About />
  <Projects />
  <Now />
  <Contact />
  <footer slot="footer">
    <em><a href={site.footerJoke.href}>{site.footerJoke.text}</a></em>
  </footer>
</Base>
```

- [ ] **Step 3: Preview locally (manual visual check)**

Run: `npm run dev`
Open the printed URL (usually `http://localhost:4321`). Confirm: pixel headings render, pastel cards have hard shadows, two "coming soon" project cards show, buttons work. Then stop the dev server (Ctrl+C).

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Verify all sections rendered into HTML**

Run (bash):
```bash
for s in "Isabelly Baldo" "stuff i made" "coming soon" "find me" "xkcd 1319"; do
  grep -q "$s" dist/index.html && echo "OK: $s" || echo "MISSING: $s"
done
```
Expected: five `OK:` lines, no `MISSING:`.

- [ ] **Step 6: Commit**

```bash
git add public/favicon.svg src/pages/index.astro
git commit -m "feat: assemble portfolio page and favicon"
```

---

## Task 8: CI/CD deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

Uses the official Astro action (installs + builds + uploads the Pages artifact) and the official Pages deploy action. The commented block at the bottom is the future VPS/custom-domain path.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Build Astro site
        uses: withastro/action@v3

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

  # ---- FUTURE: deploy to VPS + custom domain (enable later) ----
  # deploy-vps:
  #   needs: build
  #   runs-on: ubuntu-latest
  #   steps:
  #     - uses: actions/checkout@v4
  #     - name: Build
  #       run: npm ci && npm run build
  #     - name: Rsync to VPS
  #       uses: burnett01/rsync-deployments@7.0.1
  #       with:
  #         switches: -avzr --delete
  #         path: dist/
  #         remote_path: /var/www/isabelly/
  #         remote_host: ${{ secrets.VPS_HOST }}
  #         remote_user: ${{ secrets.VPS_USER }}
  #         remote_key:  ${{ secrets.VPS_SSH_KEY }}
```

- [ ] **Step 2: Validate workflow YAML syntax**

Run (bash): `node -e "const fs=require('fs');const s=fs.readFileSync('.github/workflows/deploy.yml','utf8');if(!/withastro\/action@v3/.test(s)||!/actions\/deploy-pages@v4/.test(s)){process.exit(1)}console.log('workflow ok')"`
Expected: prints `workflow ok`.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add github pages deploy workflow"
```

---

## Task 9: Repo README + push instructions

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md`**

```markdown
# isabellybaldo.github.io

My personal site. Pixels on the outside, deadpan on the inside.
Built with [Astro](https://astro.build), deployed to GitHub Pages via GitHub Actions.

## Local dev

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Editing content

- Text, links, "now" line: `src/data/site.ts`
- Project cards: `src/data/projects.ts` (flip `comingSoon` to `false` + add `href` when a repo goes public)
- Look & feel: `src/styles/global.css`

## Deploy

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and deploys to Pages.
```

- [ ] **Step 2: Final full build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add repo readme"
```

- [ ] **Step 4: Create the GitHub repo and push (manual — run by Isabelly)**

These steps happen on GitHub + your machine. The repo name **must** be exactly `isabellybaldo.github.io` for a user site.

```bash
# create the repo on github.com named: isabellybaldo.github.io  (public, no README)
git remote add origin https://github.com/isabellybaldo/isabellybaldo.github.io.git
git push -u origin main
```

- [ ] **Step 5: Enable Pages via Actions (manual — run by Isabelly)**

On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions.**
Then watch the **Actions** tab — the workflow runs and, when green, the site is live at
`https://isabellybaldo.github.io`.

---

## Self-Review

**Spec coverage:**
- Pixel-cute + deadpan aesthetic → Task 2 (design system), Task 4 (fonts), copy in Task 3. ✓
- About her, not her jobs → `site.about` copy in Task 3 avoids employers; About component Task 5. ✓
- Hero / About / Stuff I made / Now / Find me + xkcd footer → Tasks 5, 6, 7. ✓
- "Coming soon" placeholder project cards, private-safe, one-line to make public → Task 3 data + Task 6 component. ✓
- Astro, component-per-section, data-driven content → Tasks 1, 3–7. ✓
- CI/CD via GitHub Actions to Pages, future VPS/custom-domain ready → Task 8. ✓
- Repo `isabellybaldo.github.io`, profile README untouched → Task 9 (this repo only). ✓

**Placeholder scan:** No "TBD"/"add error handling"/"similar to Task N" left; every code step shows full content. The "coming soon" cards are an intentional product feature, not an unfinished plan. ✓

**Type consistency:** `Project` type (`title`, `blurb`, `tech`, `href?`, `comingSoon`) defined in Task 3 is used exactly in Task 6. `site` fields (`name`, `role`, `tagline`, `about`, `now`, `tech`, `links.github`, `links.linkedin`, `footerJoke.text/href`) defined in Task 3 are the same fields consumed in Tasks 5–7. CSS class names (`pixel-card`, `pixel-btn`, `pixel-btn--pink`, `pixel-btn--lav`, `tag`, `grid`, `coming-soon`, `muted`) defined in Task 2 match all usages. ✓
