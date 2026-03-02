# dividend-yield-column Specification

## Purpose
Defines the per-holding dividend yield column in the holdings table, introduced in feature 2.6.

## Requirements

### Requirement: Holdings table renders a Div. Yield column
The holdings table SHALL include a **Div. Yield** column displaying the annual dividend yield for each position. The value SHALL be read directly from `StockPosition.dividendYield` and SHALL NOT be computed by the frontend.

#### Scenario: Dividend-paying position displays yield percentage
- **WHEN** a position has `dividendYield > 0`
- **THEN** the cell displays the value formatted as a percentage with two decimal places (e.g., `1.45%`)

#### Scenario: Non-paying position displays dash
- **WHEN** a position has `dividendYield === 0`
- **THEN** the cell displays "—" instead of a percentage

#### Scenario: Column header is labelled correctly
- **WHEN** the holdings table is rendered
- **THEN** the column header reads "Div. Yield"
