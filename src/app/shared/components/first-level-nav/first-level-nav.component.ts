import { Component, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DashboardLayoutService } from '../../../core/services/dashboard-layout.service';
import {
  FIRST_LEVEL_ITEMS,
  getFlatItemsForFirstLevel,
  SECOND_LEVEL_ROUTES
} from '../../../core/config/nav-config';

@Component({
  selector: 'app-first-level-nav',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './first-level-nav.component.html'
})
export class FirstLevelNavComponent {
  itemClick = output<string>();

  /** Whether the nav is hovered (expanded state) */
  hovered = signal(false);

  /**
   * Nav items matching Figma exactly:
   * Dashboard, A.C., Soins de santé, Médical, Indemnités (active), Juridique, Population
   *
   * Bootstrap Icons mapped from the Figma SVG icons:
   */
  /** Home route for logo click */
  readonly homeRoute = '/dashboard/vue-ensemble';

  navItems = FIRST_LEVEL_ITEMS;

  constructor(
    protected layout: DashboardLayoutService,
    private router: Router
  ) {}

  /**
   * First-level click: navigate only when there is exactly one sub-item with a route.
   * Otherwise, only expand the second-level panel (emit itemClick).
   */
  onItemClick(itemId: string): void {
    const items = getFlatItemsForFirstLevel(itemId);

    if (items.length === 1) {
      const route = SECOND_LEVEL_ROUTES[items[0].id];
      if (route) {
        this.router.navigateByUrl(route);
      }
    }

    this.itemClick.emit(itemId);
  }

  onNavMouseEnter(): void {
    this.hovered.set(true);
  }

  onNavMouseLeave(): void {
    this.hovered.set(false);
  }
}
