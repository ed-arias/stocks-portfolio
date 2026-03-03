# sortable-columns Specification

## Purpose
Defines the sortable columns feature for the holdings table, introduced in feature 2.9.

## Requirements

### Requirement: Holdings table columns are sortable
All visible holdings table columns SHALL be sortable by clicking their header. Sorting SHALL follow a tri-state cycle: ascending → descending → default (unsorted). Only one column MAY be the active sort column at a time.

#### Scenario: First click on an unsorted column sorts ascending
- **WHEN** no column is sorted and the user clicks a column header
- **THEN** the table rows are sorted by that column in ascending order

#### Scenario: Second click on the active sort column sorts descending
- **WHEN** a column is sorted ascending and the user clicks the same column header
- **THEN** the table rows are sorted by that column in descending order

#### Scenario: Third click on the active sort column resets to default order
- **WHEN** a column is sorted descending and the user clicks the same column header
- **THEN** the table rows revert to their default (unsorted) insertion order

#### Scenario: Clicking a different column switches sort to that column ascending
- **WHEN** column A is the active sort column and the user clicks column B
- **THEN** the sort resets to ascending on column B, and column A has no sort indicator

### Requirement: Active sort column displays a directional indicator
The active sort column header SHALL display a visual indicator showing the current sort direction (ascending or descending). Unsorted column headers SHALL NOT display a sort indicator.

#### Scenario: Ascending sort shows an upward indicator
- **WHEN** a column is sorted in ascending order
- **THEN** the column header displays an upward arrow (↑) or equivalent indicator

#### Scenario: Descending sort shows a downward indicator
- **WHEN** a column is sorted in descending order
- **THEN** the column header displays a downward arrow (↓) or equivalent indicator

#### Scenario: Unsorted columns have no indicator
- **WHEN** a column is not the active sort column
- **THEN** no directional arrow is shown in that column header

### Requirement: Sort is not persisted across sessions
Sort state SHALL be local to the current browser session and SHALL NOT be written to `localStorage` or any other persistent store.

#### Scenario: Sort resets after page reload
- **WHEN** the user sorts a column and then reloads the page
- **THEN** the table renders in its default unsorted order with no active sort column

### Requirement: Sort applies within groups when grouping is active
When the holdings table is in grouped view, sorting SHALL apply within each group independently. The sort order SHALL NOT mix positions across group boundaries. When grouping is inactive (flat view), sort behaviour is unchanged.

#### Scenario: Sort within a group does not cross group boundaries
- **WHEN** grouping is active and the user sorts by a column
- **THEN** positions within each group are sorted by that column, but positions from different groups are not interleaved

#### Scenario: Sort resets when switching from grouped to flat view
- **WHEN** a column is sorted while grouping is active and the user deactivates grouping
- **THEN** the flat list is sorted by the same column (sort state is preserved across view modes)
