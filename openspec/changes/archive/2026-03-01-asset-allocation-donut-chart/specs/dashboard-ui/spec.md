## ADDED Requirements

### Requirement: Dashboard layout includes an asset allocation chart section
The dashboard SHALL render an `AssetAllocationChart` component in a dedicated card section. It SHALL be placed after the portfolio history chart section and before the holdings table. It SHALL have the same horizontal padding as adjacent sections to maintain visual alignment.

#### Scenario: Allocation chart is visible after data loads
- **WHEN** portfolio data has loaded
- **THEN** the asset allocation chart card is visible between the history chart and the holdings table

#### Scenario: Allocation chart section is included in the loading skeleton
- **WHEN** portfolio data has not yet resolved
- **THEN** the shimmer skeleton includes a placeholder block in the correct position for the allocation chart

### Requirement: Asset class color tokens are defined for both themes
The CSS token system SHALL define four asset class color tokens: `--asset-stock`, `--asset-etf`, `--asset-crypto`, and `--asset-cash`. Each SHALL have a distinct value under both `:root` (light theme) and `[data-theme='dark']` (dark theme).

#### Scenario: Color tokens resolve in light theme
- **WHEN** `data-theme` is not set or set to `light`
- **THEN** all four `--asset-*` custom properties resolve to non-empty color values

#### Scenario: Color tokens resolve in dark theme
- **WHEN** `data-theme='dark'` is applied to `<html>`
- **THEN** all four `--asset-*` custom properties resolve to non-empty color values appropriate for dark backgrounds
