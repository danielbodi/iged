import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    FormsModule,
    ToolbarModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SelectButtonModule,
    ButtonModule
  ],
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  expanded = signal(true);
  filterOptions = [
    { label: 'Tous', value: 'all' },
    { label: 'En cours', value: 'active' },
    { label: 'En attente', value: 'pending' },
    { label: 'Archivé', value: 'archived' }
  ];
  selectedFilter = signal('all');

  toggleExpanded(): void {
    this.expanded.update((v) => !v);
  }
}
