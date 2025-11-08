# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Quartz v4** digital garden/personal website project. Quartz is a static site generator that transforms markdown content into a published website with features like backlinks, graph views, and search.

- **Site URL**: https://seeingsharper.dev
- **Content Location**: `content/` directory (managed in Obsidian)
- **Build Output**: `public/` directory
- **Deploy Target**: GitHub Pages (auto-deploys on push to `v4` branch)

## Common Commands

### Build and Development
```bash
# Build the site
npx quartz build

# Build and serve locally with live reload
npx quartz build --serve

# Build documentation (if working on Quartz docs)
npm run docs
```

### Code Quality
```bash
# Type check
npm run check

# Format code
npm run format

# Run tests
npm test
```

### Node/NPM Requirements
- Node >= 22
- NPM >= 10.9.2

## Architecture

### Configuration Files

- **[quartz.config.ts](quartz.config.ts)**: Main Quartz configuration
  - Site metadata (title, base URL, analytics)
  - Theme settings (fonts, colors for light/dark mode)
  - Plugin configuration (transformers, filters, emitters)
  - Currently using Plausible analytics and custom theme

- **[quartz.layout.ts](quartz.layout.ts)**: Page layout configuration
  - Defines component layout for content pages vs list pages
  - Controls header, footer, sidebars (left/right columns)
  - Configures breadcrumbs, search, graph, table of contents, etc.

### Core Directories

- **`quartz/`**: Quartz framework code (generally don't modify unless extending Quartz itself)
  - `quartz/build.ts`: Core build pipeline
  - `quartz/components/`: UI components (Preact-based)
  - `quartz/plugins/`: Transformer, filter, and emitter plugins
  - `quartz/util/`: Utility functions
  - `quartz/styles/`: SCSS stylesheets

- **`content/`**: Markdown content files
  - Contains `.obsidian/` for Obsidian workspace settings
  - All markdown files here are processed and published

- **`public/`**: Build output (generated, do not edit)

### Plugin System

Quartz uses a plugin-based architecture with three types:

1. **Transformers**: Process markdown content (parsing, syntax highlighting, link resolution)
2. **Filters**: Determine which content to include (e.g., RemoveDrafts)
3. **Emitters**: Generate output files (HTML pages, RSS, sitemap, assets)

All plugins are configured in the `plugins` section of [quartz.config.ts](quartz.config.ts).

### Build Pipeline

1. Markdown files are parsed with unified/remark/rehype
2. Transformers process content (frontmatter, dates, links, LaTeX, etc.)
3. Filters exclude content (drafts, ignored patterns)
4. Emitters generate final output (HTML, static assets, search index)
5. Output goes to `public/` directory

## Content Guidelines

- Content files go in `content/` directory
- Files/folders matching `ignorePatterns` in config are excluded: `["private", "templates", ".obsidian"]`
- Drafts (files with `draft: true` in frontmatter) are filtered out in production
- Supports Obsidian-flavored markdown and GitHub-flavored markdown
- LaTeX rendering via KaTeX

## Deployment

- **Auto-deployment**: Pushes to `v4` branch trigger GitHub Actions workflow
- **Workflow**: [.github/workflows/deploy.yaml](.github/workflows/deploy.yaml)
- Build runs `npx quartz build` and deploys `public/` to GitHub Pages
- Site is served at https://seeingsharper.dev

## Custom Features

- **Custom OG Images**: Enabled via `Plugin.CustomOgImages()` (can be commented out to speed up builds)
- **Reader Mode**: Enabled in page layout
- **Analytics**: Plausible configured for seeingsharper.dev
