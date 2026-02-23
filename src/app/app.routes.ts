import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard-shell/dashboard-shell.component').then(
        (m) => m.DashboardShellComponent
      )
  },
  {
    path: 'dashboard/vue-ensemble',
    loadComponent: () =>
      import('./features/dashboard/dashboard-overview/dashboard-overview.component').then(
        (m) => m.DashboardOverviewComponent
      )
  }
];
