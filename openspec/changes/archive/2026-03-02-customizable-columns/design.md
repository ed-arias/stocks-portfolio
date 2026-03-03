## Context

The holdings table in `App.tsx` renders eight columns unconditionally. Column visibility state needs to live in React component state (derived from `localStorage` on first render), and each `<th>` / `<td>` pair needs to be conditionally rendered based on that state. A column picker UI — a button in the section header that opens a dropdown — lets users toggle columns.

## Goals / Non-Goals

**Goals:**

- Track visibility for all optional columns (everything except Ticker) in a `Record<ColumnId, boolean>` state object
- Hydrate initial state from `localStorage` key `holdings-visible-columns`; fall back to all-visible default
- Persist any visibility change back to `localStorage` immediately
- Render a columns button (e.g., "Columns ⌄") in the holdings section header that opens an inline dropdown with one checkbox per optional column
- Clicking outside the dropdown closes it
- Ticker column is always rendered (not in the picker)

**Non-Goals:**

- Column reordering (drag-and-drop) — backlog 14.5
- Per-column width resizing
- Server-side preference persistence
- Animation on column show/hide

## Decisions

### `Record<ColumnId, boolean>` state with a `ColumnId` string union type

Defining a `ColumnId` type (`'shares' | 'avgCost' | 'price' | 'marketValue' | 'dailyChange' | 'unrealizedGain' | 'totalReturn' | 'dividendYield'`) makes visibility lookups type-safe and the `localStorage` serialization trivial (`JSON.stringify` / `JSON.parse`).

*Alternative*: A `Set<ColumnId>` of visible columns. Rejected — `Record` serializes to JSON naturally without custom set/get helpers.

### Column picker as an inline dropdown (no modal)

A small dropdown anchored below the "Columns" button is lighter than a modal and consistent with common table toolbar patterns (Yahoo Finance, Google Sheets). Closes on outside click via a `useEffect` with a `mousedown` listener.

*Alternative*: Modal/dialog. Rejected — overkill for a simple checkbox list.

### Picker state lives entirely in `App.tsx` (no new component)

The picker is tightly coupled to the table — it directly drives `<th>` / `<td>` visibility. Extracting it to a `ColumnPicker` component adds indirection for no reuse benefit at this stage.

*Alternative*: Separate `ColumnPicker` component. Can be refactored in when sortable columns (2.9) or grouping (2.10) are added and a shared table toolbar emerges.

### localStorage key: `holdings-visible-columns`

Simple, descriptive, scoped to this feature. Stored as a JSON object `{ shares: true, avgCost: false, ... }`. Missing keys are treated as `true` (visible) to handle schema additions gracefully.

## Risks / Trade-offs

- **Stale localStorage** → If new columns are added in future features, missing keys default to `true` (visible). No migration needed.
- **Ticker-less table** → Ticker is hardcoded as always-visible; hiding it would make rows unidentifiable. This is a deliberate constraint.
- **Outside-click listener** → A global `mousedown` listener is simple but can interfere with other popovers if added in the future. Mitigation: scope the listener to a `ref` on the picker container.
