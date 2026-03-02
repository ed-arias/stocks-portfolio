## Why

The holdings table currently shows unrealized gain/loss and daily change per position, but gives no indication of income generated. Dividend yield is a fundamental metric for evaluating income-producing holdings and is standard in every peer portfolio tracker. Backlog item 2.6.

## What Changes

- Add `dividendYield: number` (annual yield %, pre-computed by backend) to `StockPosition`
- Add a **Div. Yield** column to the holdings table displaying the yield as a percentage, or a dash for non-dividend-paying assets
- Update the mock service fixture with a realistic `dividendYield` value per position

## Capabilities

### New Capabilities

- `dividend-yield-column`: Per-holding annual dividend yield column in the holdings table — renders `dividendYield` from `StockPosition` as a formatted percentage (or "—" when zero/null)

### Modified Capabilities

- `service-contract`: `StockPosition` gains a new required field `dividendYield: number`

## Impact

- `src/types/index.ts` — add `dividendYield: number` to `StockPosition`
- `src/services/StockService.ts` — add `dividendYield` to each mock position fixture
- `src/App.tsx` — add Div. Yield column to the holdings table
- `src/App.css` — any minor column-width or alignment adjustments
- `openspec/specs/service-contract/spec.md` — new requirement for `dividendYield` field
