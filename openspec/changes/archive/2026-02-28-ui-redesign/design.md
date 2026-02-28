## Context

The app is a React 19 + TypeScript + Vite SPA. All styling lives in two files (`index.css` for global tokens and `App.css` for layout). The theme system uses CSS custom properties toggled via a `data-theme` attribute on `<html>`, persisted to `localStorage`.

## Goals / Non-Goals

**Goals:**
- Replace the Vite template aesthetic with a clean, Apple-inspired design system
- Define a typographic system using two Google Fonts (UI sans + data mono)
- Establish a full CSS variable token set for both Light and Dark themes
- Introduce a sidebar + main layout with mobile collapse
- Keep zero new runtime dependencies

**Non-Goals:**
- Extracting components into `src/features/` (separate change)
- Adding new data features

## Decisions

### Typography
**Figtree** (UI font — all text, labels, logotype, headings) paired with **JetBrains Mono** (data font — numbers in cards, table cells). Both loaded via Google Fonts in `index.html`.

- Figtree: clean geometric sans-serif with Apple-like character; applied to `--font-ui`
- JetBrains Mono: crisp monospace with excellent legibility at small sizes; applied to `--font-data`
- `font-variant-numeric: tabular-nums` applied globally to the holdings table for column alignment

**Rationale:** A geometric sans UI font paired with a monospace data font creates a "techy but readable" hierarchy — the UI feels clean like Apple, the numbers feel precise like a terminal.

### Color Palette

**Light theme** — iOS system aesthetics:
- Background: `#F2F2F7` (iOS system gray)
- Surface: `#FFFFFF`
- Text: `#1D1D1F` (Apple near-black)
- Accent: `#0071E3` (Apple blue)
- Success: `#34C759` (iOS green)
- Danger: `#FF3B30` (iOS red)
- Borders: `rgba(0,0,0,0.08)` — translucent, not flat

**Dark theme** — Apple Dark Mode:
- Background: `#000000` (pure black)
- Surface: `#1C1C1E` (iOS dark surface)
- Text: `#FFFFFF`
- Accent: `#0A84FF` (iOS dark mode blue)
- Success: `#30D158`, Danger: `#FF453A`
- Borders: `rgba(255,255,255,0.08)` — translucent

### CSS Architecture
All design tokens in `index.css` as CSS custom properties. `App.css` handles layout and component rules. No CSS Modules, no CSS-in-JS.

### Layout
Left sidebar (`240px`) + main content grid on desktop (≥900px), collapsing to a top bar + single column on mobile. Grid areas: `sidebar`, `main`.

### Animations
CSS-only staggered `fadeUp` entrance using `animation-delay` on cards and table rows. Total stagger budget: ~480ms (8 elements × 60ms). No JS animation library.

### Theme Toggle
Icon-based SVG sun/moon toggle (no text). Styled as a 36×36px rounded button using `var(--bg-subtle)` background.

## Risks / Trade-offs

- [Risk] FOUT on font load → Mitigation: `font-display: swap` via Google Fonts URL, `font-synthesis: none` on `:root`
- [Risk] Sidebar breakpoint on intermediate screens → Mitigation: hard breakpoint at 900px collapses sidebar to top bar
