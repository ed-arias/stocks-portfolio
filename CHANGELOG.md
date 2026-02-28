# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!--
Best practices:
  - Keep an [Unreleased] section at the top to track upcoming changes.
  - Use ISO 8601 dates (YYYY-MM-DD) for all release entries.
  - Group changes under: Added | Changed | Deprecated | Removed | Fixed | Security.
  - Latest version comes first.
  - Changelogs are for humans — avoid raw commit log dumps.
  - Highlight breaking changes and deprecations explicitly.
-->

## [Unreleased]

### Added
- Total Return summary card on the dashboard showing all-time absolute gain/loss (USD) and percentage with iOS-style pill badge

### Changed
- Moved all financial calculations (market value, unrealized gain, daily change, portfolio weight, total return) out of the frontend and into the backend service layer
- `StockService` mock now returns fully pre-computed `StockPosition` and `PortfolioSummary` data with no runtime arithmetic
- `App.tsx` render logic now reads pre-computed fields directly — no inline multiplication or division
- Extended `StockPosition` type with six backend-owned fields: `marketValue`, `unrealizedGain`, `unrealizedGainPercentage`, `dailyChange`, `dailyChangePercentage`, `portfolioWeight`
- Extended `PortfolioSummary` type with `totalReturn` and `totalReturnPercentage`
- Updated `README.md` API contract to document all new pre-computed fields

## [0.2.0] - 2026-02-28

### Changed
- Full UI redesign with Apple-inspired aesthetic (Figtree + JetBrains Mono fonts)
- Replaced flat Vite template layout with sidebar + main content grid
- Replaced generic button theme toggle with icon-based sun/moon SVG toggle
- Redesigned summary cards with iOS-style pill badges for gain/loss indicators
- Redesigned holdings table with tabular-nums, monospace data font, and company name sub-label
- New Light theme: iOS system gray palette (`#F2F2F7`) with Apple blue accent (`#0071E3`)
- New Dark theme: pure black (`#000000`) with layered surfaces and `#0A84FF` accent
- Replaced plain text loading state with shimmer skeleton that preserves the layout shell
- Added staggered `fadeUp` entrance animations on cards and table rows

## [0.1.0] - 2026-02-28

### Added
- React 19 + TypeScript + Vite project scaffold
- ESLint and Prettier configuration
- `StockService` abstraction over mock portfolio data
- `ThemeProvider` context with Light and Glassmorphism Dark theme support
- Theme toggle component with instant CSS variable switching
- Dashboard with Total Portfolio Value, Daily Gain/Loss, and Holdings Summary cards

[Unreleased]: https://github.com/ed-arias/stocks-portfolio/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/ed-arias/stocks-portfolio/releases/tag/v0.1.0
