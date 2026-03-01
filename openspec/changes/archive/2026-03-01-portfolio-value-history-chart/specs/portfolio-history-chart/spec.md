## ADDED Requirements

### Requirement: PortfolioChart renders an area line chart
The `PortfolioChart` component SHALL render an SVG area chart using Recharts `<AreaChart>` with `PortfolioHistoryPoint[]` data. The chart SHALL display portfolio total value on the Y-axis and date labels on the X-axis. The area fill SHALL use a linear gradient from `--accent` to transparent.

#### Scenario: Chart renders with data
- **WHEN** `PortfolioChart` mounts with a non-empty `data` prop
- **THEN** the SVG area chart is visible with at least two plotted points and an X-axis showing date labels

#### Scenario: Chart renders with empty data
- **WHEN** `PortfolioChart` receives an empty array
- **THEN** the chart area is blank with no error thrown

### Requirement: Period selector controls the displayed time window
The `PortfolioChart` component SHALL render a pill-group with exactly six period options: `1W`, `1M`, `3M`, `YTD`, `1Y`, `All`. Selecting a period SHALL call `StockService.getPortfolioHistory(period)` and re-render the chart with the returned data. The active period SHALL be visually distinguished using `--accent` background and white text.

#### Scenario: Default period on mount
- **WHEN** `PortfolioChart` first mounts
- **THEN** the `1M` period is active and its data is displayed

#### Scenario: Period switch updates chart
- **WHEN** the user clicks a different period button
- **THEN** the previously active button loses its active style, the clicked button gains it, and the chart updates with new data points

#### Scenario: All periods are selectable
- **WHEN** the user clicks each of the six period buttons in sequence
- **THEN** each becomes active and the chart updates accordingly without errors

### Requirement: Chart tooltip shows value and date on hover
The chart SHALL display a custom tooltip when the user hovers over a data point. The tooltip SHALL show the formatted portfolio value (e.g. `$27,891.45`) and the date string. The tooltip SHALL use the `--surface` and `--border` CSS tokens for background and border.

#### Scenario: Tooltip appears on hover
- **WHEN** the user hovers over the chart line or area
- **THEN** a tooltip appears near the cursor with the formatted value and date for that data point

### Requirement: Chart is responsive
The `PortfolioChart` container SHALL use `<ResponsiveContainer width="100%" height={260}>` so the chart fills its parent width on all viewport sizes. The X-axis SHALL show only the first and last tick labels to avoid crowding on narrow screens.

#### Scenario: Chart fills container width
- **WHEN** the viewport is resized
- **THEN** the chart redraws to fill the available container width without horizontal overflow

### Requirement: Chart applies the active theme
The chart SHALL visually reflect the active theme (light or dark). The gradient fill and axis colors SHALL use CSS custom property values read at render time so they update when the theme changes without requiring a page reload.

#### Scenario: Chart updates on theme toggle
- **WHEN** the user switches between light and dark themes
- **THEN** the chart gradient, axis lines, and tick labels update to match the new theme tokens
