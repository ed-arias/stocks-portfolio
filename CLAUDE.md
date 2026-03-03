# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check (tsc -b) then bundle
npm run lint      # Run ESLint across the project
npm run preview   # Serve the production build locally
```

No test runner is configured yet.

## Architecture

`main.tsx` wraps `<App>` in `<ThemeProvider>` — all theme state lives there and is consumed via `useTheme()` anywhere in the tree.

`App.tsx` is currently the single feature component. It calls `StockService.getPortfolioSummary()` on mount and renders the dashboard (summary card, chart placeholder, holdings table) directly. As the app grows, dashboard sections should be extracted into `src/features/`.

**Data flow:** `StockService` → `App` state (`PortfolioSummary`) → JSX. The service is a plain object with async methods returning typed data. Swapping mock data for a real API only requires changing `StockService.ts` — no component changes needed.

**Theming:** CSS custom properties on `:root` (light) and `[data-theme='dark']` (dark/glassmorphism). `ThemeProvider` writes the attribute to `document.documentElement` and persists the preference to `localStorage`. No CSS-in-JS — style changes belong in `src/index.css` or `src/App.css`.

## Changelog

After implementing any new feature, always update `CHANGELOG.md` under `## [Unreleased]` using the appropriate Keep a Changelog category (`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`). Do not commit a feature without a corresponding changelog entry.

## UI Development

When building or redesigning any UI component, page, or visual feature, always use the `/frontend-design` skill instead of writing plain markup directly. It commits to a bold aesthetic direction before coding and produces distinctive, production-grade interfaces — avoiding generic patterns, overused fonts, and cookie-cutter layouts.

## Git Workflow

After a feature is archived, create a logical git commit covering all changes introduced by that feature (source files, styles, types, services, docs, changelog). Then ask for permission before pushing to remote.

Before committing an archived feature, review and update the following docs as needed:

| File | Update when |
|---|---|
| `CHANGELOG.md` | Always — add an entry under `## [Unreleased]` for every feature |
| `README.md` | A user-visible capability was added, changed, or removed |
| `BACKEND.md` | `StockPosition`, `PortfolioSummary`, or any service method changed; a new backend requirement was identified |

## Backend API Contract

`BACKEND.md` is the source of truth for the API contract, backend requirements, and planned infrastructure. Update it when any of the following occur:

- A field is added to `StockPosition` or `PortfolioSummary` → update the TypeScript types block and JSON response example in the API Contract section
- A new `StockService` method is introduced → document the endpoint shape, query parameters, and response type
- A new backend infrastructure requirement is identified (auth, preferences, market data, etc.) → add a row to the relevant domain table

Do not implement a feature that requires new backend data without first documenting it in `BACKEND.md`.

## OpenSpec

Feature proposals and completed change archives live in `openspec/`. Completed changes are in `openspec/changes/archive/` using the `DDMMYYYY-feature-name` naming convention. Use `/opsx:propose` to start a new change.
