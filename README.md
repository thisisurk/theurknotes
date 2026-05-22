# theurknotes.com

Personal hub for Urk. Next.js + MDX + Vercel.

## Local dev

    npm install
    npm run dev

Open http://localhost:3000

## Common tasks

### Write a new note

1. Create file: `/content/notes/YYYY-MM-DD-some-slug.mdx`
2. Copy frontmatter from an existing note, fill in title/slug/date/tag
3. Write body in Markdown
4. For images: drop them in `/public/images/notes/[slug]/` then reference as `![alt](/images/notes/[slug]/filename.jpg)`
5. `git add . && git commit -m "note: [title]" && git push`
6. Vercel deploys automatically within ~30 seconds

### Change copy on homepage

Edit `/lib/content.ts`. All text lives there. Commit and push.

### Add or update a venture card

Edit `/lib/ventures.ts`. Add a new object to the `ventures` array or edit an existing one.

### Change a status badge

Edit the `status` field of the venture in `/lib/ventures.ts` to one of:
`"live"`, `"near-ship"`, `"wip"`, `"coming"`.

### Preview a draft

Set `draft: true` in frontmatter. Drafts show in `npm run dev` but never in production.

### Replace OG image

The Open Graph image is generated dynamically by `app/opengraph-image.tsx` using Next.js `ImageResponse`. Edit that file to customize, or drop a static 1200×630 PNG at `app/opengraph-image.png` to override.

### Replace favicon

Edit `app/icon.svg` (a 32×32 inline SVG). Next.js will hash and serve it as the favicon automatically.

## Pre-flight before deploy

1. Replace `[TODO]` GitHub URL in `lib/content.ts` → `socials[1].url`
2. Replace `[TODO]` email in `lib/content.ts` → `socials[2].url`
3. Hero avatar lives at `/public/avatars/` and is referenced via `hero.avatar.src` in `lib/content.ts`. Current asset: `ronin-sao1-660.webp` (660 wide, portrait).
4. (Optional) override OG image via `app/opengraph-image.png`
5. DNS migration to point `theurknotes.com` at Vercel — see `MIGRATION-PLAN.md`
6. Delete sample draft note at `/content/notes/2026-04-19-sample.mdx` (or keep as reference)

## Stack

- Next.js 16 (App Router, React 19, Turbopack)
- Tailwind CSS v4 (CSS-first `@theme` config in `app/globals.css`)
- TypeScript strict
- `next-mdx-remote/rsc` for MDX rendering
- `gray-matter` for frontmatter parsing
- `lucide-react` icons (brand icons inline)
- `@vercel/analytics` for page-view analytics
- Deploy: Vercel (default subdomain — DNS migration is a separate step)

## Project structure

```
app/                  routes, layout, RSS, sitemap, OG image
components/           UI components
lib/
  content.ts          all human-editable copy
  ventures.ts         venture cards + status badges
  notes.ts            file-system MDX loader
  utils.ts            cn() + helpers
content/notes/        MDX posts (one per file)
public/
  llms.txt            curated overview for LLMs
  robots.txt          allow major LLM crawlers
  images/notes/       images for posts
```
