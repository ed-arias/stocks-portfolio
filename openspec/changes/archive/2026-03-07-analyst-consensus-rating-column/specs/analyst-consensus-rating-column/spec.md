## ADDED Requirements

### Requirement: AnalystRating type is exported from types
An `AnalystRating` interface SHALL be exported from `src/types/index.ts` with two fields: `label: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell'` and `analystCount: number`.

#### Scenario: AnalystRating is importable from types
- **WHEN** a component imports `AnalystRating` from `src/types/index.ts`
- **THEN** both `label` and `analystCount` fields are present and typed correctly

### Requirement: Analyst Rating column is available in the holdings table
The holdings table SHALL include an optional "Analyst Rating" column that displays a color-coded badge showing the consensus rating label and analyst count for each position. The column SHALL be toggleable via the existing column picker and visible by default.

#### Scenario: Analyst Rating column is visible by default
- **WHEN** a user visits the app with no stored column preferences
- **THEN** the "Analyst Rating" column is visible in the holdings table

#### Scenario: Badge displays rating label and analyst count
- **WHEN** a position has a non-null `analystRating`
- **THEN** the cell displays the rating label (e.g., "Strong Buy") and the analyst count (e.g., "12 analysts")

#### Scenario: No badge for positions without a rating
- **WHEN** a position has no `analystRating` (undefined)
- **THEN** the cell renders an em dash (—) or equivalent empty state

### Requirement: Analyst Rating badges use distinct color tiers
Rating badges SHALL use a five-tier color scheme: Strong Buy and Buy use green tones, Hold uses an amber/neutral tone, Sell and Strong Sell use red tones. Color tokens SHALL work in both light and dark themes.

#### Scenario: Strong Buy and Buy render with green styling
- **WHEN** a position has `analystRating.label === 'Strong Buy'` or `'Buy'`
- **THEN** the badge background uses a green color family consistent with `--success`

#### Scenario: Hold renders with amber/neutral styling
- **WHEN** a position has `analystRating.label === 'Hold'`
- **THEN** the badge background uses an amber or neutral color token

#### Scenario: Sell and Strong Sell render with red styling
- **WHEN** a position has `analystRating.label === 'Sell'` or `'Strong Sell'`
- **THEN** the badge background uses a red color family consistent with `--danger`

### Requirement: Analyst Rating column is sortable by rating tier
The Analyst Rating column SHALL be sortable using the existing tri-state sort system. Ascending sort SHALL order positions from most bullish to most bearish (Strong Buy first, Strong Sell last). Positions with no rating SHALL sort last in both ascending and descending directions.

#### Scenario: Ascending sort orders most bullish first
- **WHEN** the user sorts the Analyst Rating column ascending
- **THEN** rows are ordered Strong Buy → Buy → Hold → Sell → Strong Sell, with unrated positions last

#### Scenario: Descending sort orders most bearish first
- **WHEN** the user sorts the Analyst Rating column descending
- **THEN** rows are ordered Strong Sell → Sell → Hold → Buy → Strong Buy, with unrated positions last

#### Scenario: Unrated positions are always last regardless of sort direction
- **WHEN** sorting ascending or descending on Analyst Rating
- **THEN** positions with `analystRating === undefined` appear after all rated positions
