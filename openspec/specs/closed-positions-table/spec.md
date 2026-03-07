# closed-positions-table Specification

## Requirements

### Requirement: Closed positions section renders below active holdings table
The Holdings section SHALL include a collapsible "Closed Positions" subsection rendered immediately below the active holdings table. The subsection SHALL default to collapsed on page load.

#### Scenario: Section is collapsed on initial render
- **WHEN** the page loads
- **THEN** the closed positions table body is hidden and only the section header is visible

#### Scenario: User expands the section
- **WHEN** the user clicks the "Closed Positions" header or toggle
- **THEN** the table body becomes visible and shows all closed position rows

#### Scenario: User collapses the section
- **WHEN** the section is expanded and the user clicks the header or toggle
- **THEN** the table body is hidden again

### Requirement: Closed positions table displays required columns
The closed positions table SHALL display the following columns: Ticker, Company, Asset Class, Shares, Avg Cost, Exit Price, Realized G/L ($), Realized G/L (%), Hold Period.

#### Scenario: All columns are visible when section is expanded
- **WHEN** the closed positions section is expanded
- **THEN** all nine columns are rendered with correct headers

#### Scenario: Realized gain is styled green, loss is styled red
- **WHEN** a closed position has a positive realized gain
- **THEN** the Realized G/L cells are rendered with the success color token
- **WHEN** a closed position has a negative realized gain
- **THEN** the Realized G/L cells are rendered with the danger color token

### Requirement: Closed positions are grouped by asset class with collapsible sections
Rows in the closed positions table SHALL be grouped by `assetClass`. Each group SHALL have a collapsible header row showing the asset class label and the subtotal of realized gain/loss (absolute only) for that group. Groups SHALL default to expanded.

#### Scenario: Rows are organized under correct asset class group
- **WHEN** the closed positions section is expanded
- **THEN** each row appears under the group header that matches its `assetClass`

#### Scenario: Group subtotal shows sum of absolute realized G/L
- **WHEN** a group header row is visible
- **THEN** the Realized G/L ($) column of the group header shows the sum of all rows in that group; the Realized G/L (%) column is blank

#### Scenario: User collapses an asset class group
- **WHEN** the user clicks a group header
- **THEN** all rows in that group are hidden; the group header remains visible

### Requirement: Closed positions table columns are sortable
Every column in the closed positions table SHALL be sortable. Clicking a column header SHALL toggle between ascending and descending sort. Default sort SHALL be close date descending (most recent first).

#### Scenario: Clicking a column header sorts rows ascending
- **WHEN** the user clicks a column header that is not the active sort
- **THEN** rows within each asset class group are sorted by that column ascending

#### Scenario: Clicking the active sort column header reverses direction
- **WHEN** the user clicks the currently active sort column header
- **THEN** sort direction toggles between ascending and descending

### Requirement: Hold period is displayed in human-readable form
The Hold Period column SHALL display the backend-supplied `holdDays` value formatted as a human-readable string: days only for < 30 days ("14d"), months for 30–364 days ("3mo"), and years + months for ≥ 365 days ("1y 2mo").

#### Scenario: Short hold period shows days
- **WHEN** `holdDays` is less than 30
- **THEN** the cell displays "<N>d"

#### Scenario: Medium hold period shows months
- **WHEN** `holdDays` is between 30 and 364 inclusive
- **THEN** the cell displays "<N>mo"

#### Scenario: Long hold period shows years and months
- **WHEN** `holdDays` is 365 or greater
- **THEN** the cell displays "<Y>y <M>mo" (omitting months if zero)
