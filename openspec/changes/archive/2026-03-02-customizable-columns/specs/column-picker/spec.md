## ADDED Requirements

### Requirement: Holdings table supports per-column visibility toggling
The holdings table SHALL support showing and hiding individual optional columns. The **Ticker** column SHALL always be visible and SHALL NOT be toggleable. All other columns SHALL be toggleable independently.

#### Scenario: All columns visible by default
- **WHEN** a user visits the app for the first time with no stored preference
- **THEN** all columns are visible in the holdings table

#### Scenario: Hidden column is absent from the table
- **WHEN** a column is toggled off
- **THEN** neither its `<th>` header nor any of its `<td>` cells are rendered in the DOM

#### Scenario: Ticker column is always rendered
- **WHEN** the holdings table is rendered regardless of any column picker state
- **THEN** the Ticker column header and all Ticker cells are present in the DOM

### Requirement: Column picker UI allows toggling visibility
The holdings section header SHALL include a **Columns** button that opens an inline dropdown listing all optional columns with checkboxes. Checking or unchecking a column immediately updates the table.

#### Scenario: Column picker opens on button click
- **WHEN** the user clicks the Columns button
- **THEN** a dropdown appears listing all optional columns with their current visibility state reflected by checkbox state

#### Scenario: Column picker closes on outside click
- **WHEN** the column picker dropdown is open and the user clicks outside it
- **THEN** the dropdown closes

#### Scenario: Toggling a checkbox updates the table immediately
- **WHEN** the user checks or unchecks a column in the picker
- **THEN** the corresponding column appears or disappears from the table without a page reload

### Requirement: Column visibility is persisted to localStorage
The visibility state of all optional columns SHALL be persisted to `localStorage` under the key `holdings-visible-columns` as a JSON object. The state SHALL be restored on page load.

#### Scenario: Preference survives page reload
- **WHEN** a user hides one or more columns and then reloads the page
- **THEN** the same columns remain hidden after reload

#### Scenario: Missing keys default to visible
- **WHEN** the stored `holdings-visible-columns` JSON is missing a key for a column
- **THEN** that column is treated as visible (defaults to `true`)
