# Stocks Portfolio

A personal stock portfolio tracker built with React 18 and TypeScript. Visualize your holdings, track daily gains and losses, and monitor overall portfolio performance — all with a polished UI that supports both Light and Glassmorphism Dark themes.

## Features

- **Portfolio Dashboard** — total portfolio value, daily gain/loss with color indicators, and a top holdings summary
- **Light / Dark Theming** — instant theme switching via CSS custom properties; dark mode uses a Glassmorphism aesthetic
- **StockService abstraction** — decoupled data layer with mock data, designed for future REST/GraphQL integration

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite |
| Styling | CSS Modules + CSS Custom Properties |
| State | React Context API |
| Linting | ESLint + TypeScript rules |
| Formatting | Prettier |

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
  components/   # Reusable UI primitives
  features/     # Feature-scoped views and logic
  services/     # Data fetching (StockService)
  hooks/        # Custom React hooks
  styles/       # Global styles and CSS variables
  types/        # Shared TypeScript interfaces
```
