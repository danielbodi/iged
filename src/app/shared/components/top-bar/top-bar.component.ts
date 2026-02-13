import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    ButtonModule,
    BreadcrumbModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    MenuModule
  ],
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent {
  secondLevelExpanded = input(false);
  toggleSecondLevel = output<void>();

  breadcrumbHome: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  breadcrumbItems: MenuItem[] = [
    { label: 'Indemnités' },
    { label: 'Recent' }
  ];

  userMenuItems: MenuItem[] = [
    { label: 'Mon profil', icon: 'pi pi-user' },
    { label: 'Paramètres', icon: 'pi pi-cog' },
    { separator: true },
    { label: 'Déconnexion', icon: 'pi pi-sign-out' }
  ];

  onToggleClick(): void {
    this.toggleSecondLevel.emit();
  }
}
