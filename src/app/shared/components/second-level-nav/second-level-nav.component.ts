import { Component, inject, input, output, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { ExpandableSearchComponent } from '../expandable-search/expandable-search.component';
import {
  SECTIONS_BY_FIRST_LEVEL,
  getActiveItemIdFromUrl,
  type SecondLevelSection,
  type SecondLevelMenuItem
} from '../../../core/config/nav-config';

export type { SecondLevelSection, SecondLevelMenuItem };

@Component({
  selector: 'app-second-level-nav',
  standalone: true,
  imports: [NgClass, FormsModule, ExpandableSearchComponent],
  templateUrl: './second-level-nav.component.html'
})
export class SecondLevelNavComponent {
  expanded = input(false);
  activeSectionId = input<string | null>(null);
  itemClick = output<void>();
  close = output<void>();

  /** Whether the search input is expanded (replaces the title) */
  searchExpanded = signal(false);
  searchQuery = signal('');

  /** Dashboard second-level menu */
  dashboardSections = SECTIONS_BY_FIRST_LEVEL['dashboard'] ?? [];

  /** Indemnités second-level menu */
  indemnitesSections = SECTIONS_BY_FIRST_LEVEL['indemnites'] ?? [];

  private router = inject(Router);

  /** Title derived from the active first-level section */
  title = computed(() => {
    const id = this.activeSectionId();
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      ac: 'A.C.',
      soins: 'Soins de santé',
      medical: 'Médical',
      indemnites: 'Indemnités',
      juridique: 'Juridique',
      population: 'Population'
    };
    return id ? titles[id] ?? id : 'Menu';
  });

  /** Filtered sections based on search query (matches section names AND item labels) */
  filteredSections = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const sourceSections = this.activeSectionId() === 'dashboard'
      ? this.dashboardSections
      : this.indemnitesSections;

    if (!q) return sourceSections;

    return sourceSections
      .map(section => {
        const sectionMatches = section.label.toLowerCase().includes(q);
        return {
          ...section,
          collapsed: false,
          items: sectionMatches
            ? section.items
            : section.items.filter(item => item.label.toLowerCase().includes(q))
        };
      })
      .filter(section => section.items.length > 0);
  });

  /** Whether the search produced no results */
  noResults = computed(() => {
    const q = this.searchQuery().trim();
    return q.length > 0 && this.filteredSections().length === 0;
  });

  /** Active menu item derived from current route; falls back to 'at-dc-demande' when no match */
  activeItemId = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => getActiveItemIdFromUrl(this.router.url)),
      startWith(getActiveItemIdFromUrl(this.router.url))
    ),
    { initialValue: getActiveItemIdFromUrl(this.router.url) }
  );

  /** Resolved active item id for template (handles null from toSignal) */
  resolvedActiveItemId = computed(() => this.activeItemId() ?? 'at-dc-demande');

  onSearchExpandedChange(expanded: boolean): void {
    this.searchExpanded.set(expanded);
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  toggleSection(section: SecondLevelSection): void {
    section.collapsed = !section.collapsed;
  }

  /** Handle second-level item click: navigate if routable, always collapse panel */
  onItemClick(itemId: string): void {
    if (itemId === 'vue-ensemble') {
      this.router.navigateByUrl('/dashboard/vue-ensemble');
    } else if (itemId === 'at-dc-demande') {
      this.router.navigateByUrl('/');
    }
    // Always emit so the parent collapses the second-level panel
    this.itemClick.emit();
  }
}
