## Why

The current sidebar + vertical-scroll layout wastes 240px of horizontal space on an underutilised sidebar (logo + theme toggle only), forces users to scroll past two full-height chart panels to reach the holdings table, and caps content at 1100px — leaving most desktop screens with large dead zones. Restructuring the layout gives every pixel a job and puts the most-used content within one scroll.

## What Changes

- **BREAKING** Remove the persistent left sidebar; replace with a 56px sticky top bar
- Top bar displays the portfolio total value and daily delta as a persistent hero metric, always visible regardless of scroll position
- Replace the two-card summary row + separate chart + separate allocation vertical stack with a 2-column dashboard grid: portfolio chart (left, dominant) + right rail (Total Return card stacked above AllocationExplorer)
- Holdings table is now directly below the dashboard grid — one scroll from the top
- Max-width raised from 1100px to 1400px to utilise wide monitors
- Full responsive cascade: 2-col grid → single column at 900px; delta text abbreviates at 767px; wordmark hidden at 599px

## Capabilities

### New Capabilities
- `dashboard-layout`: Top bar with hero metric, 2-column dashboard grid, and holdings below; full responsive breakpoint system

### Modified Capabilities
- `dashboard-ui`: Layout structure and visual hierarchy change — sidebar removed, content zones rearranged, max-width and spacing updated

## Impact

- `src/App.tsx`: `Sidebar` component replaced by `TopBar`; JSX restructured around `.dashboard-grid` and `.right-rail`
- `src/App.css`: Sidebar styles replaced by top-bar styles; new `.dashboard-grid`, `.right-rail`, `.chart-panel` layout classes; responsive breakpoints rewritten at 900px / 767px / 599px
- `LoadingState`: Updated to use top-bar skeleton instead of sidebar skeleton
- No service, type, or API changes
