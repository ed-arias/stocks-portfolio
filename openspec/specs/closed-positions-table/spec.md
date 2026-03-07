# closed-positions-table Specification

## Requirements

### Requirement: Holdings section uses an Active / Closed tab switcher
The Holdings section SHALL include a tab bar with two tabs — "Active" (default) and "Closed" — positioned between the section header and the table. Switching tabs replaces the table content with a smooth fade animation. The Group and Columns header controls SHALL be hidden when the Closed tab is active. The position count badge SHALL reflect active count on the Active tab and closed count on the Closed tab.

#### Scenario: Active tab is selected by default
- **WHEN** the page loads
- **THEN** the Active tab is highlighted and the existing holdings table is visible

#### Scenario: Closed tab shows the closed positions table
- **WHEN** the user clicks the Closed tab
- **THEN** the holdings table is replaced by the closed positions table with a fade-in animation

#### Scenario: Group and Columns controls are hidden on Closed tab
- **WHEN** the Closed tab is active
- **THEN** the Group button and Columns picker are not visible in the section header

#### Scenario: Position count reflects active tab
- **WHEN** the Active tab is selected
- **THEN** the section header count shows the number of active positions

#### Scenario: Closed count reflects closed tab
- **WHEN** the Closed tab is selected
- **THEN** the section header shows the number of closed positions

### Requirement: Tab bar is styled with an Apple-inspired underline indicator
The tab bar SHALL sit flush below the section header with a bottom border. Each tab SHALL be a text button. The active tab SHALL have an accent-colored underline indicator (border-bottom matching --accent) and accent-colored text. Switching tabs SHALL animate the indicator transition. Each tab SHALL show a pill badge with the count.

#### Scenario: Active tab indicator uses accent color
- **WHEN** a tab is active
- **THEN** it has a bottom border in the accent color and its text is also the accent color

#### Scenario: Tab count pill matches tab state
- **WHEN** a tab is active
- **THEN** its count pill uses the accent background; inactive tabs use the muted border background

### Requirement: Closed positions table is a full-width sortable table
The closed positions table SHALL span the full width of the holdings area. Columns: Ticker (with company name below), Asset Class, Shares, Avg Cost, Exit Price, Realized G/L ($), Realized G/L (%), Hold Period, Close Date. All columns SHALL be sortable using the same chevron pattern as the active holdings table. Default sort is close date descending.

#### Scenario: Table renders all required columns
- **WHEN** the Closed tab is active
- **THEN** all nine columns are visible: Ticker, Asset Class, Shares, Avg Cost, Exit Price, Realized G/L ($), Realized G/L (%), Hold Period, Close Date

#### Scenario: Clicking a column header sorts the table
- **WHEN** the user clicks a column header
- **THEN** rows are sorted ascending; clicking again sorts descending; clicking a third time resets to default

#### Scenario: Default sort is close date descending
- **WHEN** the Closed tab first becomes visible
- **THEN** the most recently closed position appears first

### Requirement: Rows are grouped by asset class with collapsible group headers
Rows SHALL be grouped by assetClass in canonical order: stocks, ETFs, crypto, cash. Each group SHALL have a collapsible group header row matching the active holdings table pattern (same .group-header-row, .group-chevron, .group-label, .group-count classes). The group header subtotal cell SHALL show the sum of Realized G/L ($) for that group, colored green or red.

#### Scenario: Groups appear in canonical asset class order
- **WHEN** the Closed tab is open
- **THEN** Stocks appear before ETFs, ETFs before crypto, crypto before cash; empty groups are omitted

#### Scenario: Clicking a group header collapses its rows
- **WHEN** the user clicks a group header
- **THEN** the rows for that group collapse; clicking again expands them

#### Scenario: Group header shows G/L subtotal
- **WHEN** a group header is visible
- **THEN** the Realized G/L ($) cell shows the sum for that group in green (positive) or red (negative)

### Requirement: Realized G/L cells are colored and formatted
Realized G/L ($) cells SHALL use the existing .positive / .negative classes. Realized G/L (%) SHALL be displayed in a pill badge: green pill for gains (.closed-gl-pill--pos), red pill for losses (.closed-gl-pill--neg).

#### Scenario: Positive G/L uses success color
- **WHEN** a position has a positive realized gain
- **THEN** the G/L ($) cell uses the success color and the G/L (%) pill has a green background

#### Scenario: Negative G/L uses danger color
- **WHEN** a position has a negative realized gain
- **THEN** the G/L ($) cell uses the danger color and the G/L (%) pill has a red background

### Requirement: Hold period is displayed in human-readable form
The hold period SHALL be formatted from the backend-supplied `holdDays` value: days only for < 30 days ("14d"), months for 30–364 days ("3mo"), and years + optional months for ≥ 365 days ("1y 2mo" or "2y" if months are zero).

#### Scenario: Short hold period shows days
- **WHEN** `holdDays` is less than 30
- **THEN** the cell displays "<N>d"

#### Scenario: Medium hold period shows months
- **WHEN** `holdDays` is between 30 and 364 inclusive
- **THEN** the cell displays "<N>mo"

#### Scenario: Long hold period shows years and months
- **WHEN** `holdDays` is 365 or greater
- **THEN** the cell displays "<Y>y <M>mo" (omitting months if zero)
