## Why

The holdings table currently shows unrealized gain/loss but no intraday context — users can't see how each position is performing today without leaving the app. The `dailyChange` and `dailyChangePercentage` fields already exist on `StockPosition` (pre-computed by the backend), so this is a pure UI change with zero data work.

## What Changes

- Add a **Daily Change** column to the holdings table showing `dailyChange` (absolute, formatted as currency) and `dailyChangePercentage` (%) stacked vertically, color-coded green/red — matching the layout of the existing Profit / Loss column
- Update `BACKLOG.md` to mark 2.3 as Done

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `dashboard-ui`: The holdings table requirement gains a new required column (Daily Change); the column list in the spec changes

## Impact

- `src/App.tsx` — add `<th>` and `<td>` for Daily Change to the holdings table
- `openspec/specs/dashboard-ui/spec.md` — delta spec updating the holdings table column list
- `CHANGELOG.md`, `BACKLOG.md` — documentation updates
- No service, type, or style changes required
