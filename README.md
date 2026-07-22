# Muhammad Madni — Software Engineer Portfolio

Personal portfolio and UK-style CV for **Muhammad Madni**, Full Stack Software Engineer (Merseyside, UK).

Positioned for permanent software engineering roles — personal brand, not a software-house site.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Framer Motion (scroll / UI motion)
- React Three Fiber + Drei (WebGL “systems constellation” hero)
- Print-optimised A4 CV at `/cv`

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Capture live project demos

Refresh screenshots / short WebM clips from live deployments:

```bash
# Fumari dashboard capture needs credentials (never commit real secrets)
export FUMARI_USER=admin
export FUMARI_PASS='your-password'
npm run capture:demos
```

Assets land in `public/projects/<slug>/` (`hero.png`, `screen-2.png`, `demo.webm`).

## Deploy (Vercel)

1. Push this repo to GitHub
2. Import in [Vercel](https://vercel.com)
3. Set optional env: `NEXT_PUBLIC_SITE_URL=https://your-domain.com`

`vercel.json` is included for Next.js defaults.

## Content

Editable copy lives in `src/content/`:

- `profile.ts` — name, contact, summary, domains
- `projects.ts` — case studies
- `experience.ts` / `cv.ts` — CV blocks

Paste-ready LinkedIn and GitHub profile copy:

- `content/linkedin.md`
- `content/github-profile-readme.md`

## Pages

| Route | Purpose |
|-------|---------|
| `/` | WebGL hero + selected work |
| `/projects` | Case study index |
| `/projects/[slug]` | Case study detail |
| `/about` | Career narrative |
| `/cv` | 2-page UK CV (print to PDF) |
| `/contact` | Email, phone, LinkedIn, GitHub |

## Positioning

Keep copy focused on software engineering employment. Prefer personal engineer framing over agency ownership or client-sales CTAs.
