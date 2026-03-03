## ADDED Requirements

### Requirement: Holdings table supports grouping by asset class
The holdings table SHALL support a grouped view where rows are organised under collapsible asset-class section headers. A "Group by" toggle in the holdings section header SHALL switch between grouped and flat (ungrouped) views. The flat view SHALL be the default.

#### Scenario: Flat view is shown by default
- **WHEN** the user loads the app with no prior grouping preference
- **THEN** the holdings table renders as a flat list with no group headers visible

#### Scenario: Activating grouping shows asset-class group headers
- **WHEN** the user activates the "Group by" toggle
- **THEN** positions are separated under group headers labelled by asset class (e.g. "Stocks", "ETFs", "Crypto", "Cash")

#### Scenario: Deactivating grouping returns to flat list
- **WHEN** the user deactivates the "Group by" toggle while grouping is active
- **THEN** the table reverts to a flat list with no group headers

#### Scenario: Group display order is fixed
- **WHEN** grouping is active
- **THEN** groups appear in the order: Stocks → ETFs → Crypto → Cash, regardless of position order in the data

#### Scenario: Groups with no positions are not shown
- **WHEN** grouping is active and no positions belong to a given asset class
- **THEN** that asset class group header is not rendered

### Requirement: Group headers display subtotals
Each group header row SHALL display the asset class label, the number of positions in the group, the total market value of all positions in the group, and the aggregate daily change for the group.

#### Scenario: Group header shows position count
- **WHEN** grouping is active
- **THEN** each group header row shows how many positions belong to that group

#### Scenario: Group header shows total value
- **WHEN** grouping is active
- **THEN** each group header row shows the sum of `marketValue` for all positions in the group

#### Scenario: Group header shows aggregate daily change
- **WHEN** grouping is active
- **THEN** each group header row shows the sum of `dailyChange` for all positions in the group, colour-coded green (positive) or red (negative)

### Requirement: Groups are individually collapsible
Each group SHALL be expandable and collapsible by clicking its group header row. All groups SHALL start in the expanded state. Collapsing a group hides its position rows; expanding it shows them again.

#### Scenario: All groups start expanded
- **WHEN** the user activates grouping for the first time
- **THEN** all group sections are expanded and all position rows are visible

#### Scenario: Clicking a group header collapses it
- **WHEN** an expanded group header row is clicked
- **THEN** the position rows belonging to that group are hidden and the group header shows a collapsed indicator

#### Scenario: Clicking a collapsed group header expands it
- **WHEN** a collapsed group header row is clicked
- **THEN** the position rows belonging to that group become visible again

#### Scenario: Collapsing one group does not affect others
- **WHEN** the user collapses group A
- **THEN** the position rows of all other groups remain visible
