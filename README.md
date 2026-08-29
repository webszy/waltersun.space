# webopc.space

Personal technical blog and brand site for **Walter Sun**.

- Site: [https://webopc.space](https://webopc.space)
- X: [@WalterAIBuilder](https://x.com/WalterAIBuilder)

Built on the [Retypeset](https://github.com/radishzzz/astro-theme-retypeset) Astro theme, restyled for a modern, restrained developer brand (Geist + Geist Mono).

## Stack

- Astro 6 (static)
- TypeScript
- Content Collections (Markdown / MDX)
- UnoCSS
- Geist / Geist Mono

## Commands

```bash
npm install
npm run dev      # typecheck + dev server
npm run build    # typecheck + static build (+ LQIP pass)
npm run preview  # preview dist/
npm run check    # astro check only
npm run lint     # eslint
```

## Content

| Kind | Path | Route |
|------|------|--------|
| Writing (long-form) | `src/content/posts/*.md` | `/writing`, `/writing/[slug]` |
| Notes (short) | `src/content/notes/*.md` | `/notes`, `/notes/[slug]` |
| Projects | `src/data/projects.ts` | `/projects` |
| About | `src/content/about/about-en.md` | `/about` |

### Add a writing post

Create `src/content/posts/my-post.md`:

```md
---
title: My Post Title
published: 2026-08-11
description: One-line summary for lists and SEO.
tags: [Growth, Engineering]
lang: en
featured: false
pin: 0
abbrlink: my-post-title
---

Your content here.
```

Suggested tags: `Growth`, `Advertising`, `AI`, `Engineering`, `Product`, `Indie Hacking`.

### Add a note

Create `src/content/notes/my-note.md`:

```md
---
title: Short observation
published: 2026-08-11
description: Optional summary.
tags: [Engineering]
lang: en
---

Short body.
```

### Add a project

Edit `src/data/projects.ts` and append an entry.

## Site config

Primary settings live in `src/config.ts` (title, URL, colors, social links, SEO).

Fonts: `public/fonts/geist/` + `src/styles/font.css`.

## Deploy (Cloudflare Pages)

1. Connect the Git repo to Cloudflare Pages.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Node version: **20** or **22** (set in Pages environment if needed)
5. Environment: no secrets required for a pure static deploy.

Optional: set custom domain `webopc.space` in Cloudflare DNS + Pages custom domains.

## Theme heritage

This project starts from Retypeset and keeps its content collections, MDX pipeline, SEO/RSS/sitemap, TOC, and reading experience. Typography and visual system are intentionally restyled away from the default literary/editorial look.
