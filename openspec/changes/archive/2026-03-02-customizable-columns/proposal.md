## Why

The holdings table now has eight columns (Ticker, Shares, Avg Cost, Price, Total Value, Daily Change, Profit/Loss, Total Return, Div. Yield), making it wide on smaller screens and noisy for users who only care about a subset of metrics. Customizable columns let each user decide what's visible, eliminating clutter without removing data. Backlog item 2.8.

## What Changes

- Add a **column picker** UI — a toggle button in the holdings section header that opens a dropdown/popover listing all optional columns with checkboxes
- All columns except **Ticker** are toggleable; Ticker is always visible (it's the row identifier)
- Selected columns are persisted to `localStorage` so the preference survives page reloads
- Default state: all columns visible (no regression for existing users)
- No new data fields — all columns already exist on `StockPosition`

## Capabilities

### New Capabilities

- `column-picker`: UI control that lets users show/hide individual holdings table columns; state persisted to `localStorage`

### Modified Capabilities

_(none — no existing spec-level requirements change)_

## Impact

- `src/App.tsx` — column visibility state, column picker toggle button, conditional `<th>` / `<td>` rendering
- `src/App.css` — styles for the column picker button and dropdown
- `localStorage` key: `holdings-visible-columns` (array of column IDs)
- No service, type, or API changes required
