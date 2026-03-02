import { Component, OnInit, signal, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { FirstLevelNavComponent } from '../../../shared/components/first-level-nav/first-level-nav.component';
import { SecondLevelNavComponent } from '../../../shared/components/second-level-nav/second-level-nav.component';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { DashboardLayoutService } from '../../../core/services/dashboard-layout.service';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import {
  FIRST_LEVEL_ITEMS,
  getFlatItemsForFirstLevel,
  type FirstLevelNavItem,
  type SecondLevelMenuItem,
} from '../../../core/config/nav-config';
import {
  FileCardComponent,
  type FileCardData,
} from '../../../shared/components/file-card/file-card.component';

// ---------------------------------------------------------------------------
// Mock data helpers
// ---------------------------------------------------------------------------
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

function generateMockValues(
  itemId: string,
): Pick<
  FileCardData,
  'recus' | 'attribues' | 'enTraitement' | 'incomplets' | 'rappels' | 'clotures'
> {
  const h = hash(itemId);
  return {
    recus: Math.abs((h % 70) + 15),
    attribues: Math.abs(((h >> 4) % 25) + 5),
    enTraitement: Math.abs(((h >> 8) % 20) + 5),
    incomplets: Math.abs((h >> 12) % 12),
    rappels: Math.abs((h >> 16) % 8),
    clotures: Math.abs(((h >> 20) % 60) + 20),
  };
}

/** Hardcoded favorite item ids for initial mock data */
const INITIAL_FAVORITES = new Set(['indemnites--at-dc-demande', 'ac--mock-1', 'soins--mock-5']);

// ---------------------------------------------------------------------------
// Grouping model for "Autres files"
// ---------------------------------------------------------------------------
export interface SectionGroup {
  id: string;
  label: string;
  icon: string;
  cards: FileCardData[];
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
    FileCardComponent,
  ],
  templateUrl: './dashboard-overview.component.html',
})
export class DashboardOverviewComponent implements OnInit {
  constructor(
    protected layout: DashboardLayoutService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.layout.setActiveFirstLevelId('dashboard');
  }

  activeTab = 'journee';

  /** Search query from top-bar */
  searchQuery = signal('');

  /** First-level items EXCEPT dashboard */
  private readonly navItems: FirstLevelNavItem[] = FIRST_LEVEL_ITEMS.filter(
    (i) => i.id !== 'dashboard',
  );

  /** All file cards built from nav config */
  private allCards = signal<FileCardData[]>(this.buildAllCards());

  /** Normalize string for search matching */
  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  /** Check if a card matches the current search query */
  private cardMatchesSearch(card: FileCardData, query: string): boolean {
    if (!query) return true;
    const q = this.normalize(query);
    return (
      this.normalize(card.title).includes(q) ||
      this.normalize(card.sectionLabel).includes(q) ||
      this.normalize(card.id).includes(q)
    );
  }

  /** Favorite cards (filtered by search) */
  favoriteCards = computed(() => {
    const q = this.searchQuery();
    return this.allCards().filter((c) => c.favorite && this.cardMatchesSearch(c, q));
  });

  /** Non-favorite cards, grouped by first-level section (filtered by search) */
  otherSections = computed<SectionGroup[]>(() => {
    const q = this.searchQuery();
    const nonFav = this.allCards().filter((c) => !c.favorite && this.cardMatchesSearch(c, q));
    return this.navItems
      .map((nav) => ({
        id: nav.id,
        label: nav.label,
        icon: nav.icon,
        cards: nonFav.filter((c) => c.sectionIcon === nav.icon && c.sectionLabel === nav.label),
      }))
      .filter((g) => g.cards.length > 0);
  });

  /** Whether the search returned no results at all */
  searchEmpty = computed(() => {
    const q = this.searchQuery();
    return q.length > 0 && this.favoriteCards().length === 0 && this.otherSections().length === 0;
  });

  /** Total count for "Autres files" tag */
  otherCount = computed(() => this.otherSections().reduce((sum, g) => sum + g.cards.length, 0));

  /** Total count for "Mes files favorites" tag */
  favoriteCount = computed(() => this.favoriteCards().length);

  // -----------------------------------------------------------------------
  // Actions
  // -----------------------------------------------------------------------
  onTabChange(value: string | number | undefined): void {
    this.activeTab = typeof value === 'string' ? value : 'journee';
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }

  onFavoriteToggle(itemId: string): void {
    this.allCards.update((cards) =>
      cards.map((c) => (c.id === itemId ? { ...c, favorite: !c.favorite } : c)),
    );
  }

  onStatusClick(event: { itemId: string; status: string }): void {
    // No navigation for now
  }

  // -----------------------------------------------------------------------
  // Build cards from nav config
  // -----------------------------------------------------------------------
  private buildAllCards(): FileCardData[] {
    const cards: FileCardData[] = [];
    for (const nav of this.navItems) {
      const items = getFlatItemsForFirstLevel(nav.id);
      for (const item of items) {
        // Prefix with nav id to guarantee uniqueness across sections
        const uniqueId = `${nav.id}--${item.id}`;
        cards.push({
          id: uniqueId,
          title: item.label,
          sectionLabel: nav.label,
          sectionIcon: nav.icon,
          favorite: INITIAL_FAVORITES.has(uniqueId),
          ...generateMockValues(item.id),
        });
      }
    }
    return cards;
  }
}
