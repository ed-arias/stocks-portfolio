## 1. Create AllocationExplorer Component

- [x] 1.1 Create `src/features/AllocationExplorer/` directory and `AllocationExplorer.tsx` file
- [x] 1.2 Define `AllocationDimension` interface with `key`, `label`, `title`, `data`, `colorFn`, `labelFn` fields
- [x] 1.3 Implement `AllocationExplorer` component with `views: AllocationDimension[]` prop and `activeKey` state defaulting to `views[0].key`
- [x] 1.4 Render the iOS-style segmented pill selector row with active pill using `var(--accent)` background
- [x] 1.5 Render `<AllocationChart key={activeKey} ...activeView />` below the pill selector

## 2. Update App.tsx

- [x] 2.1 Add `AllocationExplorer` import; remove `AllocationChart` import
- [x] 2.2 Replace the two `AllocationChart` JSX blocks with a single `<AllocationExplorer views={[...]} />`
- [x] 2.3 Populate `views` with the `byAssetClass` dimension (key, label, title, data, colorFn, labelFn)
- [x] 2.4 Populate `views` with the `byHolding` dimension (key, label, title, data, colorFn, labelFn)
- [x] 2.5 Remove the `<div className="skeleton skeleton-alloc-holdings" />` from `LoadingState`

## 3. Update App.css

- [x] 3.1 Remove the `.skeleton-alloc-holdings` rule from `App.css`

## 4. Docs & Verification

- [x] 4.1 Update `CHANGELOG.md` under `## [Unreleased]` with Added entry for unified allocation explorer
- [x] 4.2 Add `1.13 | Unified allocation chart with dimension selector | ✅ Done` to `BACKLOG.md`
- [x] 4.3 Run `npm run build` and confirm zero TypeScript errors
- [x] 4.4 Run `npm run lint` and confirm zero ESLint errors
