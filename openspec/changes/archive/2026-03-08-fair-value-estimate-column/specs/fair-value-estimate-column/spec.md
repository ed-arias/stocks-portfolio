## ADDED Requirements

### Requirement: FairValueEstimate type is exported from types
A `FairValueEstimate` interface SHALL be exported from `src/types/index.ts` with two fields: `price: number` (the estimated fair value price per share in USD) and `source: string` (the name of the data provider, e.g., "Morningstar").

#### Scenario: FairValueEstimate is importable from types
- **WHEN** a component imports `FairValueEstimate` from `src/types/index.ts`
- **THEN** both `price` and `source` fields are present and typed correctly

### Requirement: Fair Value column is available in the holdings table
The holdings table SHALL include an optional "Fair Value" column that displays the estimated fair value price, the upside/downside percentage relative to current price, and a valuation badge (Undervalued / Fair / Overvalued) for each position. The column SHALL be toggleable via the existing column picker and visible by default.

#### Scenario: Fair Value column is visible by default
- **WHEN** a user visits the app with no stored column preferences
- **THEN** the "Fair Value" column is visible in the holdings table

#### Scenario: Cell displays price, upside, and badge for rated positions
- **WHEN** a position has a non-null `fairValue`
- **THEN** the cell shows the fair value price (formatted as currency), the upside/downside % (e.g., "+18.5%" or "−4.2%"), and the valuation badge

#### Scenario: Cell shows em dash for unrated positions
- **WHEN** a position has no `fairValue` (undefined)
- **THEN** the cell renders an em dash (—)

### Requirement: Upside percentage is derived from fair value price and current price
The upside/downside percentage SHALL be computed by the frontend as `((fairValue.price − currentPrice) / currentPrice) × 100`. A positive value means the stock is trading below fair value (upside); a negative value means it is trading above fair value (downside).

#### Scenario: Positive upside when current price is below fair value
- **WHEN** `fairValue.price` is greater than `currentPrice`
- **THEN** the displayed upside percentage is positive and prefixed with "+"

#### Scenario: Negative downside when current price is above fair value
- **WHEN** `fairValue.price` is less than `currentPrice`
- **THEN** the displayed percentage is negative

### Requirement: Valuation badges use three-tier color scheme
Valuation badges SHALL use a three-tier scheme based on upside percentage thresholds: Undervalued (upside > +10%) uses green, Fair (−10% to +10%) uses neutral/amber, Overvalued (upside < −10%) uses red. Color tokens SHALL work in both light and dark themes.

#### Scenario: Undervalued badge renders green
- **WHEN** upside percentage is greater than 10%
- **THEN** the badge displays "Undervalued" with a green background consistent with `--success`

#### Scenario: Fair badge renders neutral
- **WHEN** upside percentage is between −10% and +10% (inclusive)
- **THEN** the badge displays "Fair" with a neutral/amber background

#### Scenario: Overvalued badge renders red
- **WHEN** upside percentage is less than −10%
- **THEN** the badge displays "Overvalued" with a red background consistent with `--danger`

### Requirement: Fair Value column is sortable by upside percentage
The Fair Value column SHALL be sortable using the existing tri-state sort system. Ascending sort SHALL order positions from most undervalued (highest upside %) to most overvalued (lowest upside %). Positions with no fair value SHALL sort last in both directions.

#### Scenario: Ascending sort orders most undervalued first
- **WHEN** the user sorts the Fair Value column ascending
- **THEN** positions are ordered from highest upside % to lowest (most undervalued first)

#### Scenario: Unrated positions are always last regardless of sort direction
- **WHEN** sorting ascending or descending on Fair Value
- **THEN** positions with `fairValue === undefined` appear after all rated positions
