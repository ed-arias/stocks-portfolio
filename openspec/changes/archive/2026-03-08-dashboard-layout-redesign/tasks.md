## 1. CSS Layout Foundation

- [x] 1.1 Replace `.shell` grid with a flex-column layout (`display: flex; flex-direction: column; min-height: 100dvh`)
- [x] 1.2 Remove all `.sidebar`, `.logotype`, and `.sidebar-footer` CSS rules
- [x] 1.3 Add `.top-bar` styles: `position: sticky; top: 0; z-index: 200; height: 56px; backdrop-filter: blur(16px)`
- [x] 1.4 Add `.top-bar-brand`, `.top-bar-logo`, `.top-bar-wordmark` styles
- [x] 1.5 Add `.top-bar-hero`, `.hero-value`, `.hero-delta` styles with positive/negative colour variants
- [x] 1.6 Add `.hero-delta-full` / `.hero-delta-short` display toggle classes
- [x] 1.7 Add `.top-bar-controls` styles
- [x] 1.8 Update `.main`: remove `grid-area`, set `max-width: 1400px`, `margin: 0 auto`, `padding: 2rem 2.5rem 4rem`

## 2. Dashboard Grid

- [x] 2.1 Remove `.page-header`, `.page-label`, `.page-title` CSS rules
- [x] 2.2 Remove `.cards-grid` and staggered `.cards-grid .card:nth-child()` animation rules
- [x] 2.3 Add `.dashboard-grid`: `display: grid; grid-template-columns: 1fr 300px; gap: 1.5rem; align-items: start`
- [x] 2.4 Add `.chart-panel` with `min-width: 0` to prevent grid blowout
- [x] 2.5 Add `.right-rail`: `display: flex; flex-direction: column; gap: 1rem; min-width: 0`
- [x] 2.6 Update `.holdings-section` animation stagger from `* 4` to `* 2`

## 3. Loading Skeleton

- [x] 3.1 Update `.loading-shell` from a 2-column grid to `display: flex; flex-direction: column`
- [x] 3.2 Remove `.loading-sidebar` CSS rule
- [x] 3.3 Update `.loading-main` padding and max-width to match `.main`
- [x] 3.4 Add `.skeleton-dashboard-grid` mirroring `.dashboard-grid` layout
- [x] 3.5 Add `.skeleton-right-rail` mirroring `.right-rail` layout
- [x] 3.6 Update skeleton height for `.skeleton-alloc` to match right-rail context

## 4. Responsive Breakpoints

- [x] 4.1 At `max-width: 899px`: collapse `.dashboard-grid` to `grid-template-columns: 1fr`; update main padding
- [x] 4.2 At `max-width: 899px`: collapse `.skeleton-dashboard-grid` to single column
- [x] 4.3 At `max-width: 767px`: hide `.hero-delta-full`, show `.hero-delta-short`
- [x] 4.4 At `max-width: 599px`: hide `.top-bar-wordmark`; reduce `.hero-value` and `.hero-delta` font sizes

## 5. App Component Restructure

- [x] 5.1 Replace `Sidebar` component with `TopBar` component accepting `totalValue`, `dailyGain`, `dailyGainPercentage` props
- [x] 5.2 Render two delta `<span>` children inside `.hero-delta`: `.hero-delta-full` and `.hero-delta-short`
- [x] 5.3 Remove `<div className="page-header">` block from App render
- [x] 5.4 Remove `<div className="cards-grid">` and the Total Value card from App render
- [x] 5.5 Wrap `<PortfolioChart>` in `<div className="chart-panel">` inside `<div className="dashboard-grid">`
- [x] 5.6 Add `<aside className="right-rail">` containing Total Return card and `<AllocationExplorer>`
- [x] 5.7 Move `AllocationExplorer` views config into the right rail (no logic changes)
- [x] 5.8 Remove unused `isPositive` variable (was used only by the removed Total Value card)

## 6. Loading State Component

- [x] 6.1 Replace `<Sidebar>` in `LoadingState` with a `<header className="top-bar">` skeleton
- [x] 6.2 Render two inline skeleton divs in `.top-bar-hero` for value and delta placeholders
- [x] 6.3 Replace `skeleton-title` + `skeleton-cards` with `skeleton-dashboard-grid` + `skeleton-right-rail` structure

## 7. Verification

- [x] 7.1 Run `npm run build` — zero TypeScript errors
- [x] 7.2 Run `npm run lint` — zero ESLint errors
- [x] 7.3 Verify top bar is sticky and shows portfolio value on scroll
- [x] 7.4 Verify 2-col grid at ≥ 900px: chart left, right rail right
- [x] 7.5 Verify single-column collapse at < 900px
- [x] 7.6 Verify delta abbreviation at < 768px
- [x] 7.7 Verify wordmark hidden at < 600px
- [x] 7.8 Verify holdings table is directly below dashboard grid with no intermediate sections
