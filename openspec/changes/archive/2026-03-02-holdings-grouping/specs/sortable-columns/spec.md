## ADDED Requirements

### Requirement: Sort applies within groups when grouping is active
When the holdings table is in grouped view, sorting SHALL apply within each group independently. The sort order SHALL NOT mix positions across group boundaries. When grouping is inactive (flat view), sort behaviour is unchanged.

#### Scenario: Sort within a group does not cross group boundaries
- **WHEN** grouping is active and the user sorts by a column
- **THEN** positions within each group are sorted by that column, but positions from different groups are not interleaved

#### Scenario: Sort resets when switching from grouped to flat view
- **WHEN** a column is sorted while grouping is active and the user deactivates grouping
- **THEN** the flat list is sorted by the same column (sort state is preserved across view modes)
