# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Production build (runs `clean` automatically via `prebuild`)
- `npm run lint` / `npm run lint:fix` - ESLint
- `npm run clean` - Delete `.next` cache (runs automatically before dev/build)

## Architecture

### Stack
Next.js 15 (App Router) + Tailwind CSS v4 (`@theme` directive, not tailwind.config.js) + Framer Motion + React Three Fiber/Three.js + tsparticles

### Internationalization (3 locales)

| Locale | Route prefix | Default? |
|--------|-------------|----------|
| Traditional Chinese (zh) | `/` (no prefix) | Yes |
| English | `/en/` | No |
| Cantonese (yue) | `/yue/` | No |

- `middleware.js` (root) handles language detection via cookie `preferred-lang` → Accept-Language header → fallback to `zh`
- Each locale has its own page files: `src/app/page.js` (zh), `src/app/en/page.js`, `src/app/yue/page.js`
- Locale sub-layouts: `src/app/en/layout.js`, `src/app/yue/layout.js`
- **When modifying a page, the same change must be applied to all 3 locale versions**

### Page Structure

Each locale has: homepage (`page.js`), `/about`, `/articles`, `/articles/[slug]`, `/contact`, `/projects`

- Homepage data: inline in each `page.js`
- Project data: `src/app/projects/projectData.js` (shared by zh/yue), `src/app/en/projects/projectData.js`
- About data: `src/app/about/aboutData.js`, `src/app/en/about/aboutData.js`

### Content System

- Markdown articles/projects in `content/articles/{zh,en,yue}/` and `content/projects/{zh,en,yue}/`
- `src/lib/content.js` - File-based content reading with frontmatter parsing
- `src/lib/markdown.js` - Markdown → HTML with TOC generation (uses Shiki `github-light` theme)
- API routes: `src/app/api/content/articles/` and `src/app/api/content/projects/` serve content as JSON

### Key Components

- `Navbar.js` - Navigation with language switcher dropdown, sets `preferred-lang` cookie
- `FlightTimeline.js` - Career journey timeline with globe, flight arcs, and detail modals
- `FlightArc.js` - SVG animated arcs with traveling light dots between timeline nodes
- `GlobeBackground.js` - Three.js wireframe globe (React Three Fiber)
- `ParticlesBackground.js` - tsparticles background effect
- `MarkdownRenderer.js` - Renders HTML from markdown with Shiki syntax highlighting
- `Footer.js` - Site footer

### Styling

- Tailwind CSS v4 with `@theme` directive in `globals.css` (not `tailwind.config.js`)
- Light theme: body bg `#f8fafc`, text `#334155`
- Accent colors: `--color-electric-blue: #0ea5e9`, `--color-violet-glow: #6366f1`
- Theme forced to light mode via `next-themes` in `src/app/providers.js`
- Font: Noto Sans TC (loaded via `next/font/google` in root `layout.js`)

### Common Patterns

- Client components use `"use client"` directive and Framer Motion for animations
- Server components for article/content pages (data fetched at build time)
- All page-level styling uses direct Tailwind classes (not CSS custom properties for colors)
