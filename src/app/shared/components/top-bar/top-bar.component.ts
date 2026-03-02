import { Component, effect, inject, input, output, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuModule } from 'primeng/menu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { ExpandableSearchComponent } from '../expandable-search/expandable-search.component';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    ButtonModule,
    BreadcrumbModule,
    MenuModule,
    OverlayBadgeModule,
    ExpandableSearchComponent,
  ],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  private router = inject(Router);

  secondLevelExpanded = input(false);
  toggleSecondLevel = output<void>();
  searchChange = output<string>();

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  breadcrumbItems = signal<MenuItem[]>([]);

  userMenuItems: MenuItem[] = [
    { label: 'Mon profil', icon: 'bi bi-person' },
    { label: 'Paramètres', icon: 'bi bi-gear' },
    { separator: true },
    { label: 'Déconnexion', icon: 'bi bi-box-arrow-right' },
  ];

  /** Notification count for bell */
  notificationCount = signal(8);

  /** Message count for envelope */
  messageCount = signal(8);

  searchQuery = signal('');

  constructor() {
    effect(() => {
      this.currentUrl();
      this.updateBreadcrumb();
    });
  }

  onToggleClick(): void {
    this.toggleSecondLevel.emit();
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.searchChange.emit(query);
  }

  /** Home route used for breadcrumb and logo */
  readonly homeRoute = '/dashboard/vue-ensemble';

  private updateBreadcrumb(): void {
    const url = this.currentUrl();

    if (url.startsWith('/dashboard/vue-ensemble')) {
      this.breadcrumbItems.set([
        { label: 'Accueil', routerLink: this.homeRoute },
        { label: 'Dashboard', routerLink: this.homeRoute },
        { label: "Vue d'ensemble" },
      ]);
      return;
    }

    this.breadcrumbItems.set([
      { label: 'Accueil', routerLink: this.homeRoute },
      { label: 'Indemnités', routerLink: '/' },
      { label: 'AT & DC - Demande de paiement (IND)' },
    ]);
  }
}
