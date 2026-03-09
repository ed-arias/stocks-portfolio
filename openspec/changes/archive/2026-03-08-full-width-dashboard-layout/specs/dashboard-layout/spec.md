## MODIFIED Requirements

### Requirement: Top bar displays portfolio hero metric, Total Return, and theme toggle
The application SHALL render a sticky 56px top bar. The top bar SHALL contain three zones: brand (left), hero metric (centre), and controls (right). The hero metric zone SHALL display the total portfolio value, a daily delta badge, a vertical separator rule, a "Total Return" label, and a Total Return delta badge. The controls zone SHALL contain the icon-based theme toggle. The top bar SHALL remain fixed at the top of the viewport on scroll using `position: sticky; top: 0` with a `z-index` sufficient to overlay all scrolling content.

#### Scenario: Top bar is visible on load
- **WHEN** the application renders
- **THEN** a 56px bar is present at the top of the page containing the brand mark, portfolio value, daily delta badge, Total Return label, Total Return delta badge, and theme toggle

#### Scenario: Top bar stays visible on scroll
- **WHEN** the user scrolls down past the dashboard content
- **THEN** the top bar remains anchored at the top of the viewport and does not scroll away

#### Scenario: Positive daily delta renders as success badge
- **WHEN** `dailyGain` is greater than or equal to zero
- **THEN** the delta badge in the top bar renders with `--success` text on `--success-bg` background and an upward triangle indicator

#### Scenario: Negative daily delta renders as danger badge
- **WHEN** `dailyGain` is less than zero
- **THEN** the delta badge renders with `--danger` text on `--danger-bg` background and a downward triangle indicator

#### Scenario: Total Return group visible on wide viewports
- **WHEN** the viewport width is greater than 900px
- **THEN** the separator rule, "Total Return" label, and Total Return delta badge are visible in the top bar hero zone

#### Scenario: Total Return group hidden on narrow viewports
- **WHEN** the viewport width is 900px or below
- **THEN** the separator rule, "Total Return" label, and Total Return delta badge are not rendered in the top bar

### Requirement: Dashboard uses full-width stacked sections
On all viewport sizes the dashboard SHALL render sections in a single full-width vertical stack in document order: portfolio chart, allocation explorer, holdings table. There SHALL be no multi-column grid and no right rail. Each section SHALL occupy 100% of the available content width.

#### Scenario: Portfolio chart renders full-width
- **WHEN** the application renders on any viewport
- **THEN** the PortfolioChart section spans the full content width with no adjacent column

#### Scenario: Allocation explorer renders full-width
- **WHEN** the application renders on any viewport
- **THEN** the AllocationExplorer section spans the full content width directly below the chart

#### Scenario: Holdings table renders full-width below allocation
- **WHEN** the application renders on any viewport
- **THEN** the holdings section spans the full content width directly below the AllocationExplorer

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

## REMOVED Requirements

### Requirement: Dashboard uses a two-column grid on wide viewports
**Reason**: The fixed 300px right rail constrained the AllocationExplorer's horizontal layout, causing card height inflation that forced the chart card to grow artificially. Full-width sections eliminate this coupling entirely.
**Migration**: The Total Return metric is now in the top bar. The AllocationExplorer is rendered as a direct full-width section in `<main>`.

### Requirement: Dashboard grid collapses to single column on narrow viewports
**Reason**: The 2-column grid is removed; all viewports now use the same full-width single-column layout.
**Migration**: No migration needed — narrow viewports already see the intended layout.
