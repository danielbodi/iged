import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard-shell/dashboard-shell.component').then(
        (m) => m.DashboardShellComponent
      )
  }
];
