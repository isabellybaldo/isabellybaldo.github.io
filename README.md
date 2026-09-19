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
