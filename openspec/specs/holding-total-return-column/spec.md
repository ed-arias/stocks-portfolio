# holding-total-return-column Specification

## Purpose
Defines the per-holding total return column in the holdings table, introduced in feature 2.7.

## Requirements

### Requirement: Holdings table renders a Total Return column
The holdings table SHALL include a **Total Return** column displaying the total return per position, comprising both unrealized capital gains and all dividends received. The values SHALL be read directly from `StockPosition.totalReturn` and `StockPosition.totalReturnPercentage` and SHALL NOT be computed by the frontend.

#### Scenario: Positive total return is styled green
- **WHEN** a position has `totalReturn >= 0`
- **THEN** the cell is rendered with the positive color class and displays the absolute value formatted as currency and the percentage with two decimal places

#### Scenario: Negative total return is styled red
- **WHEN** a position has `totalReturn < 0`
- **THEN** the cell is rendered with the negative color class and displays the absolute value formatted as currency and the percentage with two decimal places

#### Scenario: Column uses stacked layout
- **WHEN** the Total Return cell is rendered
- **THEN** the currency amount and percentage are stacked vertically using the `.pl-cell` / `.pl-pct` layout, matching the Profit / Loss and Daily Change columns

#### Scenario: Column header is labelled correctly
- **WHEN** the holdings table is rendered
- **THEN** the column header reads "Total Return"
