---
name: saved-filters-toolbar
description: Implements saved filter presets in toolbars—save/delete named presets, adaptive picker (SelectButton vs Select), overlay expansion. Use when working on toolbar filters, saved presets, SelectButton, Select dropdown, or overlay expansion.
---

# Saved Filters Toolbar

## Purpose

Implement saved filter presets in toolbars: users can save/delete named presets, the filter picker adapts (SelectButton for 1–4, Select dropdown for 5+), and the expanded toolbar overlays content instead of pushing it.

## Files to Change

- `src/app/shared/components/toolbar/toolbar.component.ts` — data model, logic
- `src/app/shared/components/toolbar/toolbar.component.html` — template
- `src/styles/06-components/_c-toolbar.scss` — overlay positioning, empty-state styles
- `src/styles/05-objects/_layout.scss` — toolbar section positioning context

## Data Model

```typescript
interface SavedFilter {
  id: string;
  name: string;
  autocompleteValues: Record<string, string[]>;
  toggleValues: Record<string, boolean>;
}
```

- `savedFilters = signal<SavedFilter[]>([])` — starts empty (in-memory)
- `selectedFilterId = signal<string | null>(null)`
- `filterOptions` as `computed()` from `savedFilters()`

## Save Dialog

- PrimeNG `DialogModule`, `InputTextModule`
- `showSaveDialog`, `saveFilterName` signals
- `onSaveAndApply()`: snapshot autocomplete/toggle → new `SavedFilter` → push to `savedFilters` → set active → close

## Delete

- `onDelete()` removes selected filter, resets `selectedFilterId`

## Load Filter

- When `selectedFilterId` changes, restore autocomplete/toggle from selected `SavedFilter` (effect or method)

## Adaptive Picker

- **0 filters**: empty-state invitation ("Sauvegarder un filtre")
- **1–4 filters**: `p-selectbutton`
- **5+ filters**: `p-select` (SelectModule)

```typescript
useDropdown = computed(() => this.savedFilters().length > 4);
```

## Overlay Expansion

**layout.scss**: `.o-dashboard-layout__main-content` → `position: relative`

**c-toolbar.scss**: `.c-toolbar--expanded` → `position: absolute`, `z-index: 10`, `left: 0`, `right: 0` (overlays content; collapsed stays in flow)

## PrimeNG Imports

- `DialogModule` (primeng/dialog)
- `SelectModule` (primeng/select)
