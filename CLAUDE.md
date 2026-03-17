# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack  
- `npm start` - Start production server
- `npm run lint` - Run ESLint checks
- `npm run lint:fix` - Fix auto-correctable linting issues

## Architecture Overview

This is a multilingual personal portfolio website built with Next.js 15, featuring Chinese (traditional), Cantonese, and English language support.

### Core Architecture

- **Framework**: Next.js 15 with App Router
- **Build Tool**: Turbopack for faster development builds
- **Styling**: Tailwind CSS with custom aurora animations
- **Internationalization**: Custom middleware-based routing (`/yue` for Cantonese, default for Chinese)
- **Typography**: Noto Sans TC for Chinese/Cantonese text rendering

### Key Directories

- `src/app/` - Next.js App Router pages with nested route structure
  - Includes language-specific routes (e.g., `yue/` subdirectory)
  - Page-specific data files (e.g., `projectData.js`, `aboutData.js`)
- `src/components/` - Reusable UI components including timeline visualizations
- `content/` - Content management with `articles/` and `projects/` subdirectories
- `public/` - Static assets and images

### Language Routing System

The middleware.js implements automatic language detection and routing:
- Cookie-based language preference storage
- Accept-Language header parsing for initial visits
- Automatic redirection to appropriate language routes
- Support for Cantonese (`yue`), Traditional Chinese (default), and English

### Styling System

- Tailwind CSS with custom configuration
- Dark theme with deep space color palette
- Custom aurora animation keyframes
- Responsive design with mobile-first approach

### Component Architecture

Key reusable components include:
- `JourneyTimeline.js` - Complex timeline visualization with country theming
- `ParticlesBackground.js` - Interactive particle system background
- `Navbar.js` - Responsive navigation with language switching
- Various timeline components (`SerpentineTimeline.js`, `CreativeTimeline.js`)

### Content Management

- Articles and projects stored in structured directories under `content/`
- Page-specific data objects in corresponding `*Data.js` files
- Markdown rendering support via `MarkdownRenderer.js`

## Development Notes

- The site uses motion animations via Framer Motion
- Three.js integration for 3D graphics via React Three Fiber
- Icon system uses both Lucide React and React Icons
- Theme switching implemented with next-themes
- All JavaScript files use modern ES modules syntax