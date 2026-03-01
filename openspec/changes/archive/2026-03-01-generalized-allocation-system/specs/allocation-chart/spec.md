## ADDED Requirements

### Requirement: AllocationChart renders SVG donut segments for every non-zero entry
The `AllocationChart` component SHALL render an SVG donut chart with one segment per entry in the `data: AllocationBreakdown[]` prop where `percentage > 0`. Each segment's stroke color SHALL be determined by calling `colorFn(item)`. Entries with `percentage === 0` SHALL be omitted from the SVG.

#### Scenario: Multiple non-zero entries render distinct segments
- **WHEN** `data` contains N entries all with `percentage > 0`
- **THEN** exactly N colored SVG segments are rendered in the donut

#### Scenario: Zero-percentage entry is omitted
- **WHEN** an `AllocationBreakdown` entry has `percentage === 0`
- **THEN** no SVG segment is rendered for that entry

### Requirement: AllocationChart displays a color-coded legend using labelFn
The component SHALL render a legend listing each non-zero entry with its color swatch, a label returned by `labelFn(item)`, formatted percentage, and formatted absolute value. The legend SHALL read values directly from `data[]` with no arithmetic.

#### Scenario: Legend entries match visible segments
- **WHEN** the chart renders with N non-zero entries
- **THEN** the legend displays exactly N entries, each matching a visible donut segment in color and label string

### Requirement: Hovering a segment shows a tooltip
The component SHALL display a tooltip when the user hovers over a donut segment. The tooltip SHALL show the label (from `labelFn`), absolute value (formatted as currency), and percentage. It SHALL be implemented as an absolutely positioned `<div>` driven by React state — not a native SVG `<title>`.

#### Scenario: Tooltip appears on hover
- **WHEN** the user moves the pointer over a donut segment
- **THEN** a tooltip appears near the cursor showing the label, formatted value, and percentage

#### Scenario: Tooltip disappears on mouse leave
- **WHEN** the user moves the pointer off all segments
- **THEN** the tooltip is no longer rendered

### Requirement: AllocationChart accepts a title prop rendered above the chart
The component SHALL render a visible heading using the `title: string` prop above the donut chart.

#### Scenario: Title is rendered
- **WHEN** `title` is passed as a non-empty string
- **THEN** a heading element with that text appears above the chart

### Requirement: AllocationChart performs no financial arithmetic
The component SHALL read `percentage` and `value` directly from `AllocationBreakdown[]`. It SHALL NOT sum, divide, or derive any financial value at runtime — only SVG geometry (dasharray/dashoffset) is computed from percentages.

#### Scenario: No runtime financial computation
- **WHEN** the component renders
- **THEN** all financial values displayed come directly from the `data` prop with no arithmetic applied
