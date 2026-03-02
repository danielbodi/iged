---
name: iged-dashboard-figma
description: Implements iGED Dashboard from Figma using ITCSS, BEMIT, Plectrum, and PrimeNG. Use when implementing Figma prototypes, dashboard components, ITCSS, BEMIT, or Plectrum design system.
---

# iGED Dashboard Figma Implementation

## Purpose

Implement the iGED Dashboard prototype from Figma with Angular, PrimeNG, ITCSS, BEMIT, and Plectrum design system.

## Global Context

- **Tech**: Angular latest, PrimeNG latest
- **SCSS**: ITCSS (01-settings → 07-utilities)
- **Naming**: BEMIT (Block__Element--Modifier)
- **Design**: Plectrum Design System, Figma UI Kit
- **Components**: PrimeNG by default; wrap with c- classes

## ITCSS Structure

```
01-settings/   - variables, tokens
02-tools/      - mixins, functions
03-generic/    - resets
04-elements/   - typography, links
05-objects/    - layout (o-)
06-components/ - c-
07-utilities/  - u-
```

## Component Prompts Summary

| Component | Key behavior |
|-----------|---------------|
| First-level nav | Collapsed icons; expand on hover (overlay); click → second-level expands |
| Second-level nav | Slide in/out; search bar; menu items with badges |
| Top-bar | Toggle, breadcrumb, search, actions, user menu + badge |
| Toolbar | Expand/collapse; search, SelectButton, form items |
| Card + DataTable | Scroll shadows, row hover actions (sticky or absolute) |

## Layout

- Flex/grid: first-level | second-level (conditional) | main content
- State: `secondLevelExpanded`, `firstLevelHoveredItem`
- Animations: second-level slide; first-level overlay (no layout shift)

## Figma URLs

| Component | Node |
|-----------|------|
| Main screen | [653-25174](https://www.figma.com/design/8qMJdeW1f1tGwY9RAwgsYz/Dashboard?node-id=653-25174) |
| First-level nav | [692-24850](https://www.figma.com/design/8qMJdeW1f1tGwY9RAwgsYz/Dashboard?node-id=692-24850) |
| Second-level nav | [692-24851](https://www.figma.com/design/8qMJdeW1f1tGwY9RAwgsYz/Dashboard?node-id=692-24851) |
| Top-bar | [692-32396](https://www.figma.com/design/8qMJdeW1f1tGwY9RAwgsYz/Dashboard?node-id=692-32396) |
| Toolbar | [692-32736](https://www.figma.com/design/8qMJdeW1f1tGwY9RAwgsYz/Dashboard?node-id=692-32736) |
| Card + DataTable | [693-25473](https://www.figma.com/design/8qMJdeW1f1tGwY9RAwgsYz/Dashboard?node-id=693-25473) |
| Row hover actions | [693-26655](https://www.figma.com/design/8qMJdeW1f1tGwY9RAwgsYz/Dashboard?node-id=693-26655) |
| UI Kit | [806-36648](https://www.figma.com/design/1AKJP5XhCA65P5iRE0VxAu/PrimeNG-iGED?node-id=806-36648) |

## Implementation Order

1. Project setup + Plectrum + ITCSS
2. Layout shell
3. First-level nav
4. Second-level nav + animations
5. Top-bar + badge
6. Toolbar
7. Card + DataTable + scroll shadows + row actions
8. Integration and state wiring
