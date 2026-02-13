import { Component, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { DashboardLayoutService } from '../../../core/services/dashboard-layout.service';

export interface FirstLevelNavItem {
  id: string;
  icon: string;        // Bootstrap Icons class (e.g. 'bi-grid-1x2')
  label: string;
  externalLink?: boolean;
}

@Component({
  selector: 'app-first-level-nav',
  standalone: true,
  imports: [NgClass],
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
  navItems: FirstLevelNavItem[] = [
    { id: 'dashboard',      icon: 'bi-columns',          label: 'Dashboard' },
    { id: 'ac',             icon: 'bi-shield-plus',      label: 'A.C.' },
    { id: 'soins',          icon: 'bi-heart-pulse',      label: 'Soins de santé' },
    { id: 'medical',        icon: 'bi-hospital',         label: 'Médical' },
    { id: 'indemnites',     icon: 'bi-calculator',       label: 'Indemnités' },
    { id: 'juridique',      icon: 'bi-book',             label: 'Juridique' },
    { id: 'population',     icon: 'bi-person-vcard',     label: 'Population' }
  ];

  constructor(protected layout: DashboardLayoutService) {}

  onItemClick(itemId: string): void {
    this.itemClick.emit(itemId);
  }

  onNavMouseEnter(): void {
    this.hovered.set(true);
  }

  onNavMouseLeave(): void {
    this.hovered.set(false);
  }
}
