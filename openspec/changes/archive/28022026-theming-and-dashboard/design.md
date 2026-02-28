# Design: Theming & Dashboard Overview

## Architecture

| Concern | Decision |
|---|---|
| Theming primitive | CSS Custom Properties (variables) on `:root` and `[data-theme='dark']` |
| Theme state | `ThemeProvider` React Context exposing `theme` and `toggleTheme` |
| Dark mode style | Glassmorphism — `backdrop-filter: blur()`, semi-transparent backgrounds, subtle borders |
| Dashboard layout | Composition of reusable `Card` widgets |
| Data source | `StockService.ts` returning dummy `StockPosition[]` |

## CSS Variable Schema

```css
:root {                          /* Light theme (default) */
  --bg-color: #f8f9fa;
  --text-color: #212529;
  --card-bg: #ffffff;
  --accent-color: #3f51b5;
}

[data-theme='dark'] {            /* Dark / Glassmorphism */
  --bg-color: #0f172a;
  --text-color: #f1f5f9;
  --card-bg: rgba(30, 41, 59, 0.7);
  --accent-color: #818cf8;
}
```

## Data Interface

```typescript
interface StockPosition {
  ticker: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
}
```

## Component Tree

```
App
└── ThemeProvider
    ├── ThemeToggle          # Reads/writes theme via context
    └── Dashboard
        ├── Card (TotalValue)
        ├── Card (DailyGainLoss)
        └── Card (HoldingSummary)
```

## Key Decisions

- **CSS variables over JS theming:** Zero runtime cost, instant switching via a single `data-theme` attribute on `<html>`, no component re-renders.
- **Context over prop-drilling:** Theme is consumed across the entire tree; Context is the right scope without reaching for a state library.
- **Glassmorphism only for dark:** Keeps the light theme clean and accessible; glassmorphism is a deliberate aesthetic choice for dark mode only.
