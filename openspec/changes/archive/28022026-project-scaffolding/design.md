# Design: Project Scaffolding

## Architecture

| Concern | Decision |
|---|---|
| Frontend Framework | React 18+ with TypeScript |
| Build Tool | Vite (fast HMR, optimized builds) |
| Styling | Vanilla CSS with CSS Modules for component isolation |
| State Management | React Context API for portfolio data |
| Data Layer | `StockService` abstraction over mock JSON (swap-ready for REST/GraphQL) |

## Directory Structure

```
src/
  components/   # Reusable UI primitives (Button, Table, Chart)
  features/     # Feature-scoped views and logic (Dashboard, Transactions)
  services/     # Data fetching and business logic (StockService)
  hooks/        # Custom React hooks
  styles/       # Global styles and CSS variables
  types/        # Shared TypeScript interfaces and types
```

## Tooling

- **Linting:** ESLint with recommended React and TypeScript rule sets
- **Formatting:** Prettier
- **Package Manager:** npm (or yarn/pnpm per workspace preference)

## Key Decisions

- **Vite over CRA:** Faster dev server startup and HMR, simpler config, better ESM support.
- **CSS Modules over a CSS-in-JS library:** Zero runtime cost, native browser support, no additional dependency.
- **Context API over Redux:** Sufficient for initial portfolio state; reduces boilerplate at this scale.
- **StockService abstraction:** Decouples UI from data origin so swapping mock → real API requires no component changes.
