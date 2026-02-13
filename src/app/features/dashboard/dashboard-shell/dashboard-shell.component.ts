import { Component } from '@angular/core';
import { FirstLevelNavComponent } from '../../../shared/components/first-level-nav/first-level-nav.component';
import { SecondLevelNavComponent } from '../../../shared/components/second-level-nav/second-level-nav.component';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { DashboardCardComponent } from '../../../shared/components/dashboard-card/dashboard-card.component';
import { DashboardLayoutService } from '../../../core/services/dashboard-layout.service';

@Component({
  selector: 'app-dashboard-shell',
  standalone: true,
  imports: [
    FirstLevelNavComponent,
    SecondLevelNavComponent,
    TopBarComponent,
    ToolbarComponent,
    DashboardCardComponent
  ],
  templateUrl: './dashboard-shell.component.html'
})
export class DashboardShellComponent {
  constructor(protected layout: DashboardLayoutService) {}
}
