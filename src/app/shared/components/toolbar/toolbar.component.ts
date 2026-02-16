import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

interface FilterOption {
  label: string;
  value: string;
}

interface AutocompleteFilter {
  id: string;
  label: string;
  selectedValues: string[];
  suggestions: string[];
}

interface ToggleFilter {
  id: string;
  label: string;
  value: boolean;
}

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SelectButtonModule,
    ButtonModule,
    TagModule,
    AutoCompleteModule,
    ToggleSwitchModule
  ],
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  expanded = signal(false);
  searchQuery = signal('');

  /** SelectButton saved-filter options */
  filterOptions: FilterOption[] = [
    { label: 'Filtre 1', value: 'filtre1' },
    { label: 'Filtre 2', value: 'filtre2' },
    { label: 'Filtre 3', value: 'filtre3' },
    { label: 'Filtre 4', value: 'filtre4' }
  ];
  selectedFilter = signal('filtre1');

  /** Autocomplete filter fields (expanded body) */
  autocompleteFilters: AutocompleteFilter[] = [
    { id: 'doctype', label: 'Doctype', selectedValues: ['Tous'], suggestions: ['Tous', 'Courrier', 'Facture', 'Attestation'] },
    { id: 'oa', label: 'O.A.', selectedValues: ['309'], suggestions: ['100', '200', '309', '400'] },
    { id: 'statuts', label: 'Statuts', selectedValues: ['Tous'], suggestions: ['Tous', 'En cours', 'Clôturé', 'Archivé'] }
  ];

  /** Toggle-switch filters (expanded body) */
  toggleFilters: ToggleFilter[] = [
    { id: 'mesDossiers', label: 'Mes Dossiers', value: true },
    { id: 'dossiersClotured', label: 'Dossiers Clotûrés', value: true },
    { id: 'dossiersUrgents', label: 'Uniquement Dossiers Urgents', value: true },
    { id: 'rappels', label: 'Uniquement Rappels', value: true }
  ];

  /** Active filter count for the tag badge */
  activeFilterCount = computed(() => {
    let count = 0;
    for (const f of this.autocompleteFilters) {
      count += f.selectedValues.length;
    }
    for (const t of this.toggleFilters) {
      if (t.value) count++;
    }
    return count;
  });

  /** Placeholder text changes based on expanded state */
  searchPlaceholder = computed(() =>
    this.expanded()
      ? 'Rechercher NISS, Nom, Matricule...'
      : 'Rechercher'
  );

  filteredSuggestions: string[] = [];

  toggleExpanded(): void {
    this.expanded.update(v => !v);
  }

  onAutocompleteSuggest(event: { query: string }, filter: AutocompleteFilter): void {
    const query = event.query.toLowerCase();
    this.filteredSuggestions = filter.suggestions.filter(s =>
      s.toLowerCase().includes(query)
    );
  }

  onApply(): void {
    // Apply filters logic
  }

  onSaveAndApply(): void {
    // Save and apply filters logic
  }

  onDelete(): void {
    // Delete saved filter logic
  }

  onCancel(): void {
    this.expanded.set(false);
  }
}
