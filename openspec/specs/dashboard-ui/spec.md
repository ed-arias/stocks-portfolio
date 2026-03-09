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

### Requirement: Summary cards present portfolio metrics with visual hierarchy
The dashboard SHALL display a **Total Return card** as the primary summary surface. The card value SHALL use JetBrains Mono. The label SHALL be visually subordinate using `--text-muted`. The total return indicator SHALL render as an iOS-style pill badge — colored text on a tinted background using the success or danger token pair. The Total Portfolio Value and Daily Gain/Loss are no longer rendered as dedicated cards; they are presented as the top bar hero metric instead.

#### Scenario: Positive total return renders as success pill
- **WHEN** `totalReturn` is greater than or equal to zero
- **THEN** the Total Return card badge renders with `--success` text on `--success-bg` background with an upward indicator

#### Scenario: Negative total return renders as danger pill
- **WHEN** `totalReturn` is less than zero
- **THEN** the Total Return card badge renders with `--danger` text on `--danger-bg` background with a downward indicator

### Requirement: Holdings table displays all positions with readable data alignment
The holdings table SHALL display ticker, shares, average cost, current price, total value, profit/loss, and **daily change** columns. All values SHALL be read directly from the `StockPosition` fields returned by the service — the component SHALL NOT perform any arithmetic. Numeric columns SHALL use `font-variant-numeric: tabular-nums` and JetBrains Mono. The ticker cell SHALL show the company name as a subordinate sub-label. The profit/loss column SHALL show the dollar value and percentage stacked vertically, color-coded with success/danger tokens. The daily change column SHALL show `dailyChange` (absolute, formatted as currency) and `dailyChangePercentage` (%) stacked vertically in the same layout as the profit/loss column, color-coded green when `dailyChange >= 0` and red when `dailyChange < 0`.

#### Scenario: Holdings render for all positions
- **WHEN** portfolio data is loaded
- **THEN** one table row is rendered per position with all seven columns populated using pre-computed fields from the service response

#### Scenario: Daily change is color-coded per row
- **WHEN** a position has a positive or zero `dailyChange`
- **THEN** the daily change cell renders in `--success`; when `dailyChange` is negative, in `--danger`

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
The loading state SHALL render a shimmer skeleton that mirrors the new page layout: top bar (with skeleton value and delta badge placeholders) + two-column dashboard grid skeleton (chart skeleton left, card + allocation skeleton right) + table skeleton. It SHALL NOT be a plain text string.

#### Scenario: Skeleton matches new layout on desktop
- **WHEN** the app mounts and data has not yet resolved
- **THEN** the shimmer skeleton displays a top bar with inline skeleton blocks for the hero metric, a two-column grid with a tall chart skeleton on the left and stacked card + allocation skeletons on the right, and a table skeleton below

#### Scenario: Skeleton top bar is interactive
- **WHEN** the app is in loading state
- **THEN** the theme toggle in the skeleton top bar is functional and responds to clicks

### Requirement: Layout is responsive
The dashboard SHALL use a two-column grid (`1fr 300px`) on viewports ≥ 900px and collapse to a single-column layout on narrower viewports. The top bar delta text SHALL abbreviate at 767px. The top bar wordmark SHALL hide at 599px.

#### Scenario: Layout collapses at 900px
- **WHEN** the viewport width drops below 900px
- **THEN** the two-column dashboard grid collapses to a single column and all sections stack vertically

#### Scenario: Delta text abbreviates at 767px
- **WHEN** the viewport width drops below 768px
- **THEN** the top bar delta badge shows only the percentage, not the dollar amount

#### Scenario: Wordmark hides at 599px
- **WHEN** the viewport width drops below 600px
- **THEN** the "Portfolio" text in the top bar brand zone is hidden; the ◆ mark remains

### Requirement: Dashboard layout includes a chart section between cards and table
The dashboard SHALL render a `PortfolioChart` component as the primary visual in the **left column** of the two-column dashboard grid. It SHALL occupy all available width of its column. On viewports below 900px the chart SHALL render full-width above the right-rail cards.

#### Scenario: Chart renders in left column on desktop
- **WHEN** portfolio data has loaded and viewport is ≥ 900px
- **THEN** the portfolio chart is in the left column of the dashboard grid, to the left of the right rail

#### Scenario: Chart renders full-width on mobile
- **WHEN** the viewport is below 900px
- **THEN** the portfolio chart renders full-width, stacked above the Total Return card and AllocationExplorer

### Requirement: Dashboard layout includes an asset allocation chart section
The `AllocationExplorer` component SHALL be rendered inside the **right rail** of the two-column dashboard grid, below the Total Return card. It SHALL adapt to the 300px rail width. On viewports below 900px it SHALL render full-width below the Total Return card.

#### Scenario: AllocationExplorer renders in right rail on desktop
- **WHEN** portfolio data has loaded and viewport is ≥ 900px
- **THEN** the AllocationExplorer is in the right column of the dashboard grid, below the Total Return card

#### Scenario: AllocationExplorer renders full-width on mobile
- **WHEN** the viewport is below 900px
- **THEN** the AllocationExplorer renders full-width below the Total Return card and above the holdings section

### Requirement: Asset class color tokens are defined for both themes
The CSS token system SHALL define four asset class color tokens: `--asset-stock`, `--asset-etf`, `--asset-crypto`, and `--asset-cash`. Each SHALL have a distinct value under both `:root` (light theme) and `[data-theme='dark']` (dark theme).

#### Scenario: Color tokens resolve in light theme
- **WHEN** `data-theme` is not set or set to `light`
- **THEN** all four `--asset-*` custom properties resolve to non-empty color values

#### Scenario: Color tokens resolve in dark theme
- **WHEN** `data-theme='dark'` is applied to `<html>`
- **THEN** all four `--asset-*` custom properties resolve to non-empty color values appropriate for dark backgrounds

