# Proposal: Theming & Dashboard Overview

## Status
Completed

## What
Implement a visually appealing dashboard with Light and Dark (Glassmorphism) theme support, using dummy data for initial portfolio visualization.

## Why
A polished, themeable dashboard establishes the visual language of the application and validates the component architecture before real data is introduced. Giving users a theme toggle early also surfaces theming requirements before they become expensive to retrofit.

## Scope
- Light / Dark theme toggle with instant visual switching
- CSS custom properties as the theming primitive
- `ThemeProvider` React Context to distribute theme state
- Reusable `Card` component for dashboard widgets
- Dashboard layout showing: Total Portfolio Value, Daily Gain/Loss (color-coded), top holdings summary
- `StockService` populated with realistic-looking dummy data

## Out of Scope
- Real market data integration
- Interactive chart (mocked/static for now)
- Persisting theme preference across sessions
