import { Component, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuModule } from 'primeng/menu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { MenuItem } from 'primeng/api';
import { ExpandableSearchComponent } from '../expandable-search/expandable-search.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    ButtonModule,
    BreadcrumbModule,
    MenuModule,
    OverlayBadgeModule,
    ExpandableSearchComponent
  ],
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent {
  secondLevelExpanded = input(false);
  toggleSecondLevel = output<void>();

  breadcrumbItems: MenuItem[] = [
    { label: 'Indemnités' },
    { label: 'AT & DC - Demande de paiement (IND)' }
  ];

  userMenuItems: MenuItem[] = [
    { label: 'Mon profil', icon: 'bi bi-person' },
    { label: 'Paramètres', icon: 'bi bi-gear' },
    { separator: true },
    { label: 'Déconnexion', icon: 'bi bi-box-arrow-right' }
  ];

  /** Notification count for bell */
  notificationCount = signal(8);

  /** Message count for envelope */
  messageCount = signal(8);

  searchQuery = signal('');

  onToggleClick(): void {
    this.toggleSecondLevel.emit();
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }
}
