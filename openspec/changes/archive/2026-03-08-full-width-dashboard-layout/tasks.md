## 1. PortfolioChart — revert gap-fix changes

- [ ] 1.1 Remove `<div className="chart-body">` wrapper from `PortfolioChart.tsx`; change `height="100%"` back to `height={280}`
- [ ] 1.2 Remove flex chain (`flex: 1; display: flex; flex-direction: column`) from `.chart-section` in `PortfolioChart.css`; remove `.chart-body` rule; update animation stagger to `* 1`

## 2. App.css — remove grid, add top-bar return styles

- [ ] 2.1 Remove `.dashboard-grid`, `.chart-panel`, `.right-rail`, `.skeleton-dashboard-grid`, `.skeleton-right-rail` CSS blocks
- [ ] 2.2 Add `.top-bar-return-group { display: contents }`, `.top-bar-sep` (1px vertical rule), `.top-bar-return-label` (muted uppercase label) styles
- [ ] 2.3 Add responsive rule: `.top-bar-return-group { display: none }` at `max-width: 900px`

## 3. App.tsx — update TopBar component

- [ ] 3.1 Add `totalReturn: number | null` and `totalReturnPercentage: number | null` to `TopBar` props interface
- [ ] 3.2 Render Total Return group inside `.top-bar-hero`: `<span class="top-bar-return-group">` wrapping sep, label, and delta badge

## 4. App.tsx — update main layout

- [ ] 4.1 Remove `isReturnPositive` variable and Total Return card JSX from the main App render
- [ ] 4.2 Remove `<div className="dashboard-grid">`, `<div className="chart-panel">`, `<aside className="right-rail">` wrappers; render `<PortfolioChart />` and `<AllocationExplorer>` as direct children of `<main>`
- [ ] 4.3 Pass `totalReturn` and `totalReturnPercentage` props to `<TopBar>`
- [ ] 4.4 Simplify `LoadingState` skeleton: replace `skeleton-dashboard-grid` + `skeleton-right-rail` with flat `skeleton-chart`, `skeleton-alloc`, `skeleton-table` blocks

## 5. Verify

- [ ] 5.1 Run `npm run build` — no TypeScript errors, no lint errors
- [ ] 5.2 Visually confirm: chart renders at ~280px, no gap below; AllocationExplorer renders full-width with donut+legend side by side; Total Return visible in top bar on desktop, hidden on narrow viewport
