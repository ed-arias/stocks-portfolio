## MODIFIED Requirements

### Requirement: Summary cards present portfolio metrics with visual hierarchy
The dashboard SHALL display at minimum a Total Portfolio Value card, a Daily Gain/Loss card, and a **Total Return card**. Card values (large numbers) SHALL use JetBrains Mono. Labels SHALL be visually subordinate using `--text-muted`. The gain/loss and total return indicators SHALL render as iOS-style pill badges — colored text on a tinted background using the success or danger token pair.

#### Scenario: Positive daily gain renders as success pill
- **WHEN** `dailyGain` is greater than or equal to zero
- **THEN** the gain badge renders with `--success` text on `--success-bg` background with an upward indicator

#### Scenario: Negative daily gain renders as danger pill
- **WHEN** `dailyGain` is less than zero
- **THEN** the loss badge renders with `--danger` text on `--danger-bg` background with a downward indicator

#### Scenario: Positive total return renders as success pill
- **WHEN** `totalReturn` is greater than or equal to zero
- **THEN** the Total Return card badge renders with `--success` text on `--success-bg` background

#### Scenario: Negative total return renders as danger pill
- **WHEN** `totalReturn` is less than zero
- **THEN** the Total Return card badge renders with `--danger` text on `--danger-bg` background
