## MODIFIED Requirements

### Requirement: Fair Value column is available in the holdings table
The holdings table SHALL include an optional "Fair Value" column that displays the estimated fair value price and a valuation badge for each position. The cell SHALL use a **vertical stack layout** (price on top, badge below, right-aligned) mirroring the P&L and Daily Change column layout. The valuation badge SHALL embed the upside/downside percentage as a secondary data point inside the pill using the `[Label · ±%]` format. The column SHALL be toggleable via the existing column picker and visible by default.

#### Scenario: Fair Value column is visible by default
- **WHEN** a user visits the app with no stored column preferences
- **THEN** the "Fair Value" column is visible in the holdings table

#### Scenario: Cell displays price above badge for rated positions
- **WHEN** a position has a non-null `fairValue`
- **THEN** the cell shows the fair value price (formatted as currency) stacked above a valuation badge formatted as `[Label · ±upside%]` (e.g., "Undervalued · +18.5%" or "Overvalued · −4.2%")

#### Scenario: Cell shows em dash for unrated positions
- **WHEN** a position has no `fairValue` (undefined)
- **THEN** the cell renders an em dash (—)

### Requirement: Valuation badges use three-tier color scheme
Valuation badges SHALL use a three-tier scheme based on upside percentage thresholds: Undervalued (upside > +10%) uses green, Fair (−10% to +10%) uses neutral, Overvalued (upside < −10%) uses red. Color tokens SHALL work in both light and dark themes. Badges SHALL use `font-ui` (Figtree) for the tier label and `font-data` (JetBrains Mono) for the percentage. Badges SHALL NOT use border or arrow characters. Badge shape SHALL use `border-radius: 100px` consistent with `.rating-badge`.

#### Scenario: Undervalued badge renders green
- **WHEN** upside percentage is greater than 10%
- **THEN** the badge displays "Undervalued" with a green background consistent with `--fv-undervalued-bg` and no border or arrow character

#### Scenario: Fair badge renders neutral
- **WHEN** upside percentage is between −10% and +10% (inclusive)
- **THEN** the badge displays "Fair" with a neutral background consistent with `--fv-fair-bg` and no border or arrow character

#### Scenario: Overvalued badge renders red
- **WHEN** upside percentage is less than −10%
- **THEN** the badge displays "Overvalued" with a red background consistent with `--fv-overvalued-bg` and no border or arrow character

#### Scenario: Badge embeds upside percentage as secondary element
- **WHEN** a valuation badge renders
- **THEN** the badge contains the tier label, a muted separator dot, and the upside percentage formatted as `+X.X%` or `−X.X%` in a de-emphasised style
