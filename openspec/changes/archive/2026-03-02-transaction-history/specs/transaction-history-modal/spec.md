## ADDED Requirements

### Requirement: Clicking a holding row opens a transaction history modal
Each data row in the holdings table SHALL be clickable. Clicking a row SHALL open a modal displaying the transaction history for that position. The row SHALL have a pointer cursor to signal it is interactive.

#### Scenario: Clicking a holding row opens its modal
- **WHEN** the user clicks a data row in the holdings table
- **THEN** a modal opens showing the ticker, company name, and full transaction list for that position

#### Scenario: Clicking a column header does not open a modal
- **WHEN** the user clicks a column header to sort
- **THEN** no modal opens; sort behaviour is unchanged

### Requirement: Transaction history modal displays all transactions in reverse-chronological order
The modal SHALL display a table of all transactions for the selected position. Transactions SHALL be ordered newest-first. Each row SHALL show: date, transaction type badge, number of shares (where applicable), price per share (where applicable), and total amount.

#### Scenario: Transactions display in newest-first order
- **WHEN** the modal is open
- **THEN** the most recent transaction appears at the top of the list

#### Scenario: Each transaction row shows all applicable fields
- **WHEN** the modal is open for a position with transactions
- **THEN** each row shows the date, a type badge (Buy / Sell / Dividend / Split), shares, price per share, and total amount

#### Scenario: Dividend transaction shows amount but no shares or price
- **WHEN** the modal displays a dividend transaction
- **THEN** the amount field shows the dividend received; shares and price fields show "—"

#### Scenario: Split transaction shows ratio but no amount
- **WHEN** the modal displays a split transaction
- **THEN** the shares field shows the split ratio (e.g. "2:1"); price and amount fields show "—"

### Requirement: Transaction type badges are colour-coded
Each transaction type SHALL render as a distinct pill badge: Buy → accent blue, Sell → danger red, Dividend → success green, Split → muted/neutral.

#### Scenario: Buy badge uses accent colour
- **WHEN** a Buy transaction is displayed
- **THEN** its type badge uses the accent colour scheme

#### Scenario: Sell badge uses danger colour
- **WHEN** a Sell transaction is displayed
- **THEN** its type badge uses the danger colour scheme

#### Scenario: Dividend badge uses success colour
- **WHEN** a Dividend transaction is displayed
- **THEN** its type badge uses the success colour scheme

### Requirement: Modal closes on outside click or Escape key
The modal SHALL close when the user clicks the overlay background outside the modal panel or presses the Escape key.

#### Scenario: Clicking outside the modal closes it
- **WHEN** the modal is open and the user clicks the overlay background
- **THEN** the modal closes and the holdings table is visible

#### Scenario: Pressing Escape closes the modal
- **WHEN** the modal is open and the user presses the Escape key
- **THEN** the modal closes
