---
name: adapt-table-structure
description: Refactors dashboard overview tables to single-header structure with aligned expandable detail rows. Use when restructuring tables, single header, aligned expansion, or removing nested table headers.
---

# Adapt Table Structure

## Purpose

Refactor the dashboard overview table to a single header, align expanded detail rows to the same columns, and remove the nested table's duplicate header.

## Current vs Target

**Current**

- Main table: toggler col (48px) + 6 metric cols
- Expansion: nested p-table with its own header
- Two distinct headers

**Target**

- Single header: 7 cols — first empty (label), then Reçus, Attribués, En traitement, Incomplets, Rappels, Clôturés
- TOTAL row: [chevron + "TOTAL"] | Σ values | ...
- Detail rows: [label] | values (same columns, no nested header)

## Implementation

### 1. Restructure main table columns

- Merge toggler and label into first column
- Header: 7 cols — first `th` empty, then 6 metric headers with sort icons
- TOTAL row: first `td` = chevron + "TOTAL", remaining = Tag + sum icon + value

### 2. Replace nested p-table with plain table

- Remove nested `p-table` from expansion
- Plain `<table>` with 7 cols, no `<thead>`
- Rows: one `<tr>` per detail; first col = clickable label, cols 2–7 = numeric

### 3. Client-side sorting

- `sortField`, `sortOrder` per card
- `getSortedDetails(firstLevelId): OverviewDetailRow[]` — returns sorted `row.details`
- `onSort(field)` — toggle sort on header click
- Sort applies to detail rows only; TOTAL stays first

### 4. Interactive sort icons

- Clickable sort indicators on 6 metric headers
- Wire to `onSort(field)`
- Show sort direction (asc/desc) on active column

### 5. Styles

- Remove `.c-dashboard-overview__toggler-col` width; first col flexes for label
- Expansion table: same padding, borders, font as main
- `table-layout: fixed` for alignment
- Right-align numeric cells in detail rows

## Files

| File | Changes |
|------|---------|
| `dashboard-overview.component.html` | 7-col header, merged first col, plain table in expansion, sort handlers |
| `dashboard-overview.component.ts` | Sort state, `getSortedDetails()`, `onSort()` |
| `_c-dashboard-overview.scss` | Column alignment, expanded table styling |
