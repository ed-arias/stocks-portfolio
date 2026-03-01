## ADDED Requirements

### Requirement: Asset allocation donut chart renders all asset class segments
The `AssetAllocationChart` component SHALL render an SVG donut chart with one segment per entry in `assetAllocation[]`. Each segment SHALL use the corresponding `--asset-<class>` CSS custom property as its stroke color. Segments with `percentage === 0` SHALL be omitted entirely.

#### Scenario: All four asset classes have holdings
- **WHEN** `assetAllocation` contains entries for stock, etf, crypto, and cash with non-zero percentages
- **THEN** four distinct colored segments are rendered in the donut

#### Scenario: An asset class has zero value
- **WHEN** an `AssetAllocationBreakdown` entry has `percentage === 0`
- **THEN** no SVG segment is rendered for that class

### Requirement: Chart displays a color-coded legend
The component SHALL render a legend listing each asset class with its color swatch, label, percentage, and absolute value. The legend SHALL read values directly from `assetAllocation[]` — no arithmetic in the component.

#### Scenario: Legend entries match segments
- **WHEN** the chart renders with N non-zero asset classes
- **THEN** the legend displays exactly N entries, each matching a visible donut segment in color and label

### Requirement: Hovering a segment shows a tooltip
The component SHALL display a tooltip when the user hovers over a donut segment. The tooltip SHALL show the asset class label, absolute value (formatted as currency), and percentage. It SHALL be implemented as an absolutely positioned `<div>` driven by React state — not a native SVG `<title>`.

#### Scenario: Tooltip appears on hover
- **WHEN** the user moves the pointer over a donut segment
- **THEN** a tooltip appears near the cursor showing the segment's label, formatted value, and percentage

#### Scenario: Tooltip disappears on mouse leave
- **WHEN** the user moves the pointer off all segments
- **THEN** the tooltip is no longer rendered

### Requirement: Chart component performs no arithmetic
The `AssetAllocationChart` component SHALL read `percentage` and `value` directly from the `AssetAllocationBreakdown[]` prop. It SHALL NOT sum, divide, or derive any financial value at runtime — only SVG geometry (dasharray/dashoffset) is computed.

#### Scenario: No runtime financial computation
- **WHEN** the component renders
- **THEN** all financial values displayed come directly from the `assetAllocation` prop with no arithmetic applied
