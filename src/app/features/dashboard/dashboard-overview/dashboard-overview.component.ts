import { Component, OnInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FirstLevelNavComponent } from '../../../shared/components/first-level-nav/first-level-nav.component';
import { SecondLevelNavComponent } from '../../../shared/components/second-level-nav/second-level-nav.component';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { DashboardLayoutService } from '../../../core/services/dashboard-layout.service';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import {
  FIRST_LEVEL_ITEMS,
  getFlatItemsForFirstLevel,
  type FirstLevelNavItem,
  type SecondLevelMenuItem
} from '../../../core/config/nav-config';

export interface OverviewDetailRow {
  id: string;
  label: string;
  recus: number;
  attribues: number;
  enTraitement: number;
  incomplets: number;
  rappels: number;
  clotures: number;
}

export interface OverviewTotalRow {
  id: string;
  label: string;
  recus: number;
  attribues: number;
  enTraitement: number;
  incomplets: number;
  rappels: number;
  clotures: number;
  details: OverviewDetailRow[];
}

const COLUMNS = ['recus', 'attribues', 'enTraitement', 'incomplets', 'rappels', 'clotures'] as const;

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

function generateMockValues(itemId: string): Record<(typeof COLUMNS)[number], number> {
  const h = hash(itemId);
  return {
    recus: Math.abs((h % 70) + 15),
    attribues: Math.abs(((h >> 4) % 25) + 5),
    enTraitement: Math.abs(((h >> 8) % 20) + 5),
    incomplets: Math.abs((h >> 12) % 12),
    rappels: Math.abs((h >> 16) % 8),
    clotures: Math.abs(((h >> 20) % 60) + 20)
  };
}

function buildTotalRow(firstLevelId: string): OverviewTotalRow {
  const items = getFlatItemsForFirstLevel(firstLevelId);
  const details: OverviewDetailRow[] = items.map((item) => {
    const v = generateMockValues(item.id);
    return {
      id: item.id,
      label: item.label,
      ...v
    };
  });

  const totals = details.reduce(
    (acc, d) => ({
      recus: acc.recus + d.recus,
      attribues: acc.attribues + d.attribues,
      enTraitement: acc.enTraitement + d.enTraitement,
      incomplets: acc.incomplets + d.incomplets,
      rappels: acc.rappels + d.rappels,
      clotures: acc.clotures + d.clotures
    }),
    { recus: 0, attribues: 0, enTraitement: 0, incomplets: 0, rappels: 0, clotures: 0 }
  );

  return {
    id: `TOTAL-${firstLevelId}`,
    label: 'TOTAL',
    ...totals,
    details
  };
}

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [
    NgClass,
    FirstLevelNavComponent,
    SecondLevelNavComponent,
    TopBarComponent,
    TabsModule,
    TagModule,
    ButtonModule
  ],
  templateUrl: './dashboard-overview.component.html'
})
export class DashboardOverviewComponent implements OnInit {
  constructor(
    protected layout: DashboardLayoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.layout.setActiveFirstLevelId('dashboard');
  }

  readonly sumIcon = 'assets/sum.svg';

  /** First-level items EXCEPT dashboard (dashboard is not shown as dataTable) */
  readonly tableCardItems: FirstLevelNavItem[] = FIRST_LEVEL_ITEMS.filter((i) => i.id !== 'dashboard');

  /** Cache total row per first-level (stable for session) */
  private totalRowCache = new Map<string, OverviewTotalRow>();

  /** Sort state per card: field + order (1 = asc, -1 = desc) */
  private sortStateByCard = signal<Map<string, { field: string; order: 1 | -1 }>>(new Map());

  /** Expanded row keys per card (row id -> true when expanded). Used for controlled expansion. */
  expandedRowKeys = signal<Record<string, boolean>>({});

  readonly sortableFields = ['label', 'recus', 'attribues', 'enTraitement', 'incomplets', 'rappels', 'clotures'] as const;

  activeTab = 'journee';

  getTotalRow(firstLevelId: string): OverviewTotalRow {
    if (!this.totalRowCache.has(firstLevelId)) {
      this.totalRowCache.set(firstLevelId, buildTotalRow(firstLevelId));
    }
    return this.totalRowCache.get(firstLevelId)!;
  }

  getSortedDetails(firstLevelId: string): OverviewDetailRow[] {
    const row = this.getTotalRow(firstLevelId);
    const state = this.sortStateByCard().get(firstLevelId);
    if (!state) return row.details;
    const { field, order } = state;
    return [...row.details].sort((a, b) => {
      const aVal = a[field as keyof OverviewDetailRow];
      const bVal = b[field as keyof OverviewDetailRow];
      const cmp = typeof aVal === 'string' ? (aVal as string).localeCompare(bVal as string) : (aVal as number) - (bVal as number);
      return order * cmp;
    });
  }

  getSortState(firstLevelId: string): { field: string; order: 1 | -1 } | null {
    return this.sortStateByCard().get(firstLevelId) ?? null;
  }

  /** Whether the table for this card is expanded (detail rows visible) */
  isCardExpanded(firstLevelId: string): boolean {
    const row = this.getTotalRow(firstLevelId);
    return this.expandedRowKeys()[row.id] === true;
  }

  getExpandedRowKeys(firstLevelId: string): Record<string, boolean> {
    const row = this.getTotalRow(firstLevelId);
    return this.expandedRowKeys()[row.id] === true ? { [row.id]: true } : {};
  }

  onRowExpand(firstLevelId: string): void {
    const row = this.getTotalRow(firstLevelId);
    this.expandedRowKeys.update((keys) => ({ ...keys, [row.id]: true }));
  }

  onRowCollapse(firstLevelId: string): void {
    const row = this.getTotalRow(firstLevelId);
    this.expandedRowKeys.update((keys) => {
      const next = { ...keys };
      delete next[row.id];
      return next;
    });
  }

  onSort(firstLevelId: string, field: string): void {
    if (!this.isCardExpanded(firstLevelId)) return;
    const map = new Map(this.sortStateByCard());
    const current = map.get(firstLevelId);
    if (current?.field === field) {
      map.set(firstLevelId, { field, order: (current.order * -1) as 1 | -1 });
    } else {
      map.set(firstLevelId, { field, order: 1 });
    }
    this.sortStateByCard.set(map);
  }

  onTabChange(value: string | number | undefined): void {
    this.activeTab = typeof value === 'string' ? value : 'journee';
  }

  onItemClick(itemId: string): void {
    if (itemId === 'vue-ensemble') {
      this.router.navigateByUrl('/dashboard/vue-ensemble');
      return;
    }
    if (itemId === 'at-dc-demande') {
      this.router.navigateByUrl('/');
      return;
    }
  }
}
