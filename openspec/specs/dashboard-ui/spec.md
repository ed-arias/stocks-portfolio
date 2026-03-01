# dashboard-ui Specification

## Purpose
TBD - created by archiving change ui-redesign. Update Purpose after archive.
## Requirements
### Requirement: Dashboard renders with an Apple-inspired typographic system
The dashboard SHALL load two Google Fonts — **Figtree** (UI font) and **JetBrains Mono** (data font) — declared in `index.html` and applied via `--font-ui` and `--font-data` CSS custom properties. Inter, Roboto, Arial, and system-ui SHALL NOT be used as primary fonts.

#### Scenario: Fonts load on first render
- **WHEN** the user opens the application
- **THEN** all UI text renders in Figtree and all numeric data (card values, table cells) renders in JetBrains Mono

### Requirement: Theme toggle persists and applies to all surfaces
The application SHALL apply the active theme via `data-theme` on `<html>` and persist the preference to `localStorage`. Both Light and Dark themes SHALL define distinct CSS custom property values for all tokens: background, surface, border, text, accent, success, and danger.

#### Scenario: Dark theme activates on toggle
- **WHEN** the user clicks the theme toggle
- **THEN** the `data-theme` attribute on `<html>` changes and all CSS custom properties update instantly with no layout shift

#### Scenario: Theme preference is restored on reload
- **WHEN** the user reloads the page
- **THEN** the previously selected theme is applied before first paint

### Requirement: Sidebar displays logotype and icon-based theme toggle
The sidebar SHALL display the application logotype in Figtree bold and a compact icon-based theme toggle (sun/moon SVG). The toggle SHALL NOT be a plain text button.

#### Scenario: Sidebar is visible on desktop
- **WHEN** the viewport width is 900px or wider
- **THEN** the sidebar is rendered as a fixed left column with the logotype and theme toggle visible

#### Scenario: Sidebar collapses to top bar on mobile
- **WHEN** the viewport width is below 900px
- **THEN** the sidebar collapses into a horizontal top bar with logotype left-aligned and toggle right-aligned

### Requirement: Summary cards present portfolio metrics with visual hierarchy
The dashboard SHALL display at minimum a Total Portfolio Value card, a Daily Gain/Loss card, and a **Total Return card**. Card values (large numbers) SHALL use JetBrains Mono. Labels SHALL be visually subordinate using `--text-muted`. The gain/loss and total return indicators SHALL render as iOS-style pill badges — colored text on a tinted background using the success or danger token pair.

#### Scenario: Positive daily gain renders as success pill
- **WHEN** `dailyGain` is greater than or equal to zero
- **THEN** the gain badge renders with `--success` text on `--success-bg` background with an upward indicator

#### Scenario: Negative daily gain renders as danger pill
- **WHEN** `dailyGain` is less than zero
- **THEN** the loss badge renders with `--danger` text on `--danger-bg` background with a downward indicator

#### Scenario: Positive total return renders as success pill
- **WHEN** `totalReturn` is greater than or equal to zero
- **THEN** the Total Return card badge renders with `--success` text on `--success-bg` background

#### Scenario: Negative total return renders as danger pill
- **WHEN** `totalReturn` is less than zero
- **THEN** the Total Return card badge renders with `--danger` text on `--danger-bg` background

### Requirement: Holdings table displays all positions with readable data alignment
The holdings table SHALL display ticker, shares, average cost, current price, total value, and profit/loss columns. All values SHALL be read directly from the `StockPosition` fields returned by the service — the component SHALL NOT perform any arithmetic. Numeric columns SHALL use `font-variant-numeric: tabular-nums` and JetBrains Mono. The ticker cell SHALL show the company name as a subordinate sub-label. The profit/loss column SHALL show the dollar value and percentage stacked vertically, color-coded with success/danger tokens.

#### Scenario: Holdings render for all positions
- **WHEN** portfolio data is loaded
- **THEN** one table row is rendered per position with all six columns populated using pre-computed fields from the service response

#### Scenario: Profit/loss is color-coded per row
- **WHEN** a position has a positive `unrealizedGain`
- **THEN** that cell renders in `--success`; when `unrealizedGain` is negative, in `--danger`

#### Scenario: Table rows have a hover state
- **WHEN** the user hovers over a table row
- **THEN** the row background changes to `--bg-subtle`

#### Scenario: No arithmetic in component render
- **WHEN** the holdings table renders
- **THEN** no multiplication, division, or subtraction is performed inside the component — all values come directly from position fields

### Requirement: Dashboard surfaces animate in on load
All primary surfaces (header, cards, table) SHALL animate in with a staggered CSS `fadeUp` entrance animation on first mount. Each element is offset by 60ms. Total animation budget SHALL NOT exceed 600ms. Animations SHALL NOT loop.

#### Scenario: Cards animate in sequentially
- **WHEN** portfolio data finishes loading
- **THEN** each card appears with a staggered fade-and-translate-up, offset by 60ms per element

### Requirement: Loading state uses a shimmer skeleton
The loading state SHALL render a shimmer skeleton that mirrors the page layout (sidebar + two card skeletons + table skeleton). It SHALL NOT be a plain text string.

#### Scenario: Skeleton renders before data arrives
- **WHEN** the app mounts and data has not yet resolved
- **THEN** the shimmer skeleton is displayed with the sidebar already visible

### Requirement: Layout is responsive
The dashboard SHALL use a sidebar (`240px`) + main content grid on screens ≥900px and collapse to a single-column layout with a top bar on narrower screens.

#### Scenario: Layout collapses at 900px
- **WHEN** the viewport width drops below 900px
- **THEN** the sidebar becomes a top bar and content stacks vertically

### Requirement: Dashboard layout includes a chart section between cards and table

The dashboard SHALL render a `PortfolioChart` component in a dedicated chart section placed after the `.summary-cards` grid and before the `.holdings-section`. The chart section SHALL have the same horizontal padding as the summary cards and holdings table to maintain visual alignment.

#### Scenario: Chart section is present on load

- **WHEN** portfolio data has loaded
- **THEN** the chart section is visible between the summary cards row and the holdings table with consistent horizontal alignment

#### Scenario: Chart section is included in the loading skeleton

- **WHEN** portfolio data has not yet resolved
- **THEN** the shimmer skeleton includes a chart skeleton block in the correct position between the cards skeleton and the table skeleton

### Requirement: Dashboard layout includes an asset allocation chart section
The dashboard SHALL render an `AssetAllocationChart` component in a dedicated card section. It SHALL be placed after the portfolio history chart section and before the holdings table. It SHALL have the same horizontal padding as adjacent sections to maintain visual alignment.

#### Scenario: Allocation chart is visible after data loads
- **WHEN** portfolio data has loaded
- **THEN** the asset allocation chart card is visible between the history chart and the holdings table

#### Scenario: Allocation chart section is included in the loading skeleton
- **WHEN** portfolio data has not yet resolved
- **THEN** the shimmer skeleton includes a placeholder block in the correct position for the allocation chart

### Requirement: Asset class color tokens are defined for both themes
The CSS token system SHALL define four asset class color tokens: `--asset-stock`, `--asset-etf`, `--asset-crypto`, and `--asset-cash`. Each SHALL have a distinct value under both `:root` (light theme) and `[data-theme='dark']` (dark theme).

#### Scenario: Color tokens resolve in light theme
- **WHEN** `data-theme` is not set or set to `light`
- **THEN** all four `--asset-*` custom properties resolve to non-empty color values

#### Scenario: Color tokens resolve in dark theme
- **WHEN** `data-theme='dark'` is applied to `<html>`
- **THEN** all four `--asset-*` custom properties resolve to non-empty color values appropriate for dark backgrounds

