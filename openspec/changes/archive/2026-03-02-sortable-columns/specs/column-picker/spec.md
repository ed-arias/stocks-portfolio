## ADDED Requirements

### Requirement: Hiding the active sort column resets sort state
When a column that is currently the active sort column is hidden via the column picker, the sort state SHALL reset to default (no active sort column, default row order).

#### Scenario: Sort resets when active sort column is hidden
- **WHEN** column X is the active sort column and the user hides column X via the column picker
- **THEN** the table reverts to default unsorted order and no sort indicator is shown on any column

#### Scenario: Sort is unaffected when a non-active column is hidden
- **WHEN** column X is the active sort column and the user hides a different column Y
- **THEN** the table remains sorted by column X with its sort indicator intact
