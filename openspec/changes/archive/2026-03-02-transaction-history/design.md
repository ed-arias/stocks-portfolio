## Context

`StockPosition` currently has no transaction data — only the pre-computed summary metrics. The backend owns all financial arithmetic; the frontend only formats and renders. Adding transactions follows the same pattern: backend pre-computes `transactions[]` per position, frontend renders it. The modal UI is new — no existing modal infrastructure exists in the app.

## Goals / Non-Goals

**Goals:**
- New `Transaction` type and `transactions: Transaction[]` on `StockPosition`
- Modal triggered by clicking a holding row; closes on outside click or Escape
- Transaction table inside modal: date, type badge, shares, price, total amount
- Mock data populated with realistic transactions per position
- `BACKEND.md` updated with the new type and future endpoint

**Non-Goals:**
- Adding, editing, or deleting transactions (read-only view for now)
- Pagination of transactions (mock data is small enough to render all)
- Filtering or searching within the modal
- Persisting last-viewed position

## Decisions

**Transaction type: four variants as a union**
`TransactionType = 'buy' | 'sell' | 'dividend' | 'split'`. Each maps to a distinct badge colour: buy → accent, sell → danger, dividend → success, split → muted. Alternative (enum) adds ceremony for no benefit in a TS project.

**`transactions` embedded in `StockPosition`, not a separate lookup**
Embedding keeps the data model simple and the service interface unchanged — `getPortfolioSummary()` already returns everything. A separate `getTransactions(ticker)` call would require loading state per holding and async complexity. Revisit when transaction lists grow large enough to warrant lazy loading.

**Modal state: `selectedPosition: StockPosition | null` in `App.tsx`**
Clicking a data row sets `selectedPosition`. The modal renders when it is non-null, receives the full position object (including `transactions`), and calls `onClose` to reset to null. No context needed — the modal is a direct child of `App`.

**Modal implementation: portal-free, fixed overlay in App JSX**
A `position: fixed` overlay rendered at the end of the App JSX tree sits above all content without needing `ReactDOM.createPortal`. Simple and sufficient for a single-modal app. If multiple modal types emerge, revisit with a portal/context pattern.

**Escape key + outside click to close**
`useEffect` on `selectedPosition` attaches a `keydown` listener for `Escape` and a `mousedown` listener on the overlay background. Both call `onClose`. Same pattern as the column picker (already in the codebase).

**Mock data: 3–5 transactions per position**
Enough to demonstrate all four transaction types and realistic chronological ordering without bloating the mock file. Dates use ISO 8601 strings.

## Risks / Trade-offs

- **`transactions` array in every position increases mock data size** → Acceptable; mock data is never shipped to users and the positions array is small.
- **Clicking a row now opens a modal, which changes row interaction semantics** → Row hover already signals interactivity. Add `cursor: pointer` to `.data-row` to reinforce the affordance. The sort click on `<th>` is unaffected since it targets a different element.
- **Row click conflicts with future row-level actions (e.g., edit position)** → Acceptable for now; a row actions menu can replace the direct click later.
