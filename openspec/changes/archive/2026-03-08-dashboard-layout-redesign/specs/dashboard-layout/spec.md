## ADDED Requirements

### Requirement: Top bar displays portfolio hero metric and theme toggle
The application SHALL render a sticky 56px top bar in place of the sidebar. The top bar SHALL contain three zones: brand (left), hero metric (centre), and controls (right). The hero metric zone SHALL display the total portfolio value and a daily delta badge. The controls zone SHALL contain the icon-based theme toggle. The top bar SHALL remain fixed at the top of the viewport on scroll using `position: sticky; top: 0` with a `z-index` sufficient to overlay all scrolling content.

#### Scenario: Top bar is visible on load
- **WHEN** the application renders
- **THEN** a 56px bar is present at the top of the page containing the brand mark, portfolio value, daily delta badge, and theme toggle

#### Scenario: Top bar stays visible on scroll
- **WHEN** the user scrolls down past the dashboard grid
- **THEN** the top bar remains anchored at the top of the viewport and does not scroll away

#### Scenario: Positive daily delta renders as success badge
- **WHEN** `dailyGain` is greater than or equal to zero
- **THEN** the delta badge in the top bar renders with `--success` text on `--success-bg` background and an upward triangle indicator

#### Scenario: Negative daily delta renders as danger badge
- **WHEN** `dailyGain` is less than zero
- **THEN** the delta badge renders with `--danger` text on `--danger-bg` background and a downward triangle indicator

### Requirement: Dashboard uses a two-column grid on wide viewports
On viewports ≥ 900px the dashboard SHALL render a CSS grid with `grid-template-columns: 1fr 300px`. The left column (chart panel) SHALL contain the `PortfolioChart`. The right column (right rail) SHALL contain a Total Return summary card stacked above the `AllocationExplorer`. The holdings section SHALL span full width below the grid.

#### Scenario: Two-column grid renders on desktop
- **WHEN** the viewport width is 900px or wider
- **THEN** the portfolio chart occupies the left column and the Total Return card + AllocationExplorer occupy the 300px right column

#### Scenario: Holdings table is below the dashboard grid
- **WHEN** the viewport width is 900px or wider
- **THEN** the holdings section renders full-width directly below the two-column grid with no intervening sections

### Requirement: Dashboard grid collapses to single column on narrow viewports
On viewports below 900px the two-column dashboard grid SHALL collapse to a single full-width column. Section order in the single-column layout SHALL be: portfolio chart, then right-rail cards (Total Return, AllocationExplorer), then holdings table.

#### Scenario: Grid collapses at 900px breakpoint
- **WHEN** the viewport width drops below 900px
- **THEN** `grid-template-columns` becomes `1fr` and all sections stack vertically in document order

### Requirement: Top bar delta text is abbreviated on small viewports
The top bar delta badge SHALL show the full text (`▲ +$1,204 (0.97%) today`) on viewports ≥ 768px. On viewports below 768px the badge SHALL show only the percentage (`▲ 0.97%`), hiding the dollar amount and "today" suffix.

#### Scenario: Full delta text on desktop
- **WHEN** the viewport width is 768px or wider
- **THEN** the delta badge in the top bar shows both the dollar amount and the percentage

#### Scenario: Abbreviated delta on mobile
- **WHEN** the viewport width is below 768px
- **THEN** the delta badge shows only the directional indicator and the percentage; the dollar amount and "today" suffix are hidden

### Requirement: Top bar wordmark is hidden on very small viewports
On viewports below 600px the top bar wordmark text ("Portfolio") SHALL be hidden to maximise space for the hero metric. The brand logo mark (◆) SHALL remain visible.

#### Scenario: Wordmark hidden on small mobile
- **WHEN** the viewport width is below 600px
- **THEN** the "Portfolio" wordmark text is not visible; the ◆ logo mark remains in the brand zone

### Requirement: Dashboard content is bounded at 1400px maximum width
The main content area SHALL have a `max-width` of 1400px and SHALL be horizontally centred (`margin: 0 auto`) within the viewport.

#### Scenario: Content centred on wide monitor
- **WHEN** the viewport width exceeds 1400px
- **THEN** the dashboard content is centred with equal empty margins on both sides and does not exceed 1400px in width
