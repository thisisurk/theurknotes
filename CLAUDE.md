@AGENTS.md

# theurknotes.com — project context

**What this is:** Personal Hub for Urk (solo founder brand). Anchor for identity + credibility across ventures. MDX posts in git = the CMS. No backend, no auth, no DB.

## Stack

- Next.js 16.2.4 (App Router, React 19, Turbopack, async `params`)
- Tailwind CSS v4 (CSS-first `@theme inline` in `app/globals.css` — no `tailwind.config.ts`)
- TypeScript strict
- `next-mdx-remote/rsc` + `gray-matter` for MDX notes
- `lucide-react` v1.8.0 (brand icons dropped — Twitter/GitHub are inline in `components/BrandIcons.tsx`)
- `@vercel/analytics/next`
- `@radix-ui/react-dialog` (hand-rolled Sheet — shadcn CLI skipped, see `components/ui/sheet.tsx`)

## Architecture rule (non-negotiable)

All human-editable copy lives in `lib/content.ts` and `lib/portfolio.ts` (the SSoT for ventures/tools/creations; `lib/ventures.ts` is a deprecated backwards-compat shim that adapts from `portfolio.ts`). Components import from there — never inline strings in JSX. Editing copy should never require JSX changes.

For non-coder edit recipes (write notes, edit activity items, swap hero ticker, etc.), see `EDIT-GUIDE.md`.

## Content flow

- Write a note: `content/notes/YYYY-MM-DD-slug.mdx` with frontmatter `title / slug / date / tag / summary / draft`
- Tags: `building | trat | thoughts | life` (defined in `lib/content.ts` TAGS)
- Drafts (`draft: true`) render in dev, filtered out in prod by `lib/notes.ts`
- Nav is always 5 items (no count gate) — `getPublishedCount()` is kept in `lib/notes.ts` for future use but Nav doesn't consume it
- Images: `public/images/notes/[slug]/filename.jpg`, reference as `/images/notes/[slug]/filename.jpg`

## Deploy

- Auto-deploy on `git push origin main` → Vercel
- Live: https://theurknotes.vercel.app
- Repo: https://github.com/thisisurk/theurknotes
- Custom domain `theurknotes.com` = separate step (see `MIGRATION-PLAN.md`)

## Design palette — "Midnight Library"

Dark mode only. No light-mode toggle.

- `--bg-deep` `#0B1120` (page bg)
- `--bg-card` `#0F1729`
- `--accent-gold` `#D4A853`
- `--text-primary` `#E8ECF4`
- Thai text: `:lang(th) { font-weight: 400; line-height: 1.7 }` (Noto Sans Thai)
- Fonts via `next/font/google`: Outfit (latin) + Noto Sans Thai

## Strategy / brief files (local only, gitignored)

Authoritative sources when making design or copy decisions — read them first:

- `BRAND-DNA.md`
- `PERSONAL-IDENTITY.md`
- `claude-code-prompt-v2.md`

## Commands

```
npm run dev     # local dev at :3000
npm run build   # production build — must be zero errors, zero warnings
```

## Acceptance bar (from brief)

Any change must preserve: Lighthouse Perf ≥95 mobile+desktop, A11y = 100, CLS < 0.05, TypeScript strict, no horizontal scroll at 375px, heading order h1→h2→h3 (cards are h2).
