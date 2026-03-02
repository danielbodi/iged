---
name: vue-ensemble-route
description: Adds dashboard overview landing routes with tabs, KPI cards, and expandable tables from Figma. Use when creating new dashboard routes, tabs, cards, expandable tables, or Vue d'ensemble.
---

# Vue ensemble Route

## Purpose

Add a new landing route for "Dashboard > Vue d'ensemble" based on Figma, with tabs, KPI cards, and expandable PrimeNG table. Do not replace the existing dashboard page.

## Goal

- Tabs (PrimeNG)
- Two sub-sections: **Avancement de la journée** and **Indicateurs de traitement**
- Cards with title + KPI values
- DataTable with expandable rows (PrimeNG expand pattern)

## References

- Figma: [Dashboard Vue d'ensemble](https://www.figma.com/design/8qMJdeW1f1tGwY9RAwgsYz/Dashboard?node-id=799-26343&t=3gjlqgwphp7BzbSg-1)
- PrimeNG expandable table: [v20 table expand](https://v20.primeng.org/table#expand)

## Files

- `src/app/app.routes.ts` — add lazy route
- `src/app/features/dashboard/` — new component TS/HTML
- `src/styles/06-components/` — SCSS for overview

## Data Model (mock-first)

- `tabs[]`
- `dailyProgressCards[]`, `treatmentIndicatorCards[]`
- `overviewRows[]` + nested `details[]` for expansion

## Implementation Steps

1. Create standalone component in `features/dashboard`
2. Add route (e.g. `/dashboard/vue-ensemble`) without changing existing root
3. Implement tabs + subsection layout (PrimeNG p-tabs)
4. Implement expandable table with mock data (p-table, dataKey, expandedRow template)
5. Styling pass using design tokens
6. Lint/build validation
