## REMOVED Requirements

### Requirement: Sidebar displays logotype and icon-based theme toggle
**Reason**: The sidebar has been replaced by a sticky top bar. The logotype and theme toggle are now rendered in the top bar's brand and controls zones respectively. The sidebar component (`Sidebar`) and all associated CSS (`.sidebar`, `.logotype`, `.sidebar-footer`) have been removed.
**Migration**: Use the `TopBar` component. The icon-based theme toggle (sun/moon SVG) remains; only its container changes from a vertical sidebar to the top-bar controls zone.

## MODIFIED Requirements

### Requirement: Summary cards present portfolio metrics with visual hierarchy
The dashboard SHALL display a **Total Return card** as the primary summary surface. The card value SHALL use JetBrains Mono. The label SHALL be visually subordinate using `--text-muted`. The total return indicator SHALL render as an iOS-style pill badge — colored text on a tinted background using the success or danger token pair. The Total Portfolio Value and Daily Gain/Loss are no longer rendered as dedicated cards; they are presented as the top bar hero metric instead.

#### Scenario: Positive total return renders as success pill
- **WHEN** `totalReturn` is greater than or equal to zero
- **THEN** the Total Return card badge renders with `--success` text on `--success-bg` background with an upward indicator

#### Scenario: Negative total return renders as danger pill
- **WHEN** `totalReturn` is less than zero
- **THEN** the Total Return card badge renders with `--danger` text on `--danger-bg` background with a downward indicator

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
