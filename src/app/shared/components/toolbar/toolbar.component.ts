import { Component, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DialogModule } from 'primeng/dialog';

interface SavedFilter {
  id: string;
  name: string;
  autocompleteValues: Record<string, string[]>;
  toggleValues: Record<string, boolean>;
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
    SelectModule,
    ButtonModule,
    TagModule,
    AutoCompleteModule,
    ToggleSwitchModule,
    DialogModule
  ],
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  expanded = signal(false);
  searchQuery = signal('');

  /** Saved filter presets (in-memory, starts empty) */
  savedFilters = signal<SavedFilter[]>([]);
  selectedFilterId = signal<string | null>(null);

  /** Save dialog state */
  showSaveDialog = signal(false);
  saveFilterName = signal('');

  /** Delete confirmation dialog */
  showDeleteDialog = signal(false);

  /** Rename dialog state */
  showRenameDialog = signal(false);
  renameFilterName = signal('');

  /** Whether the typed save name conflicts with an existing filter */
  duplicateExists = computed(() => {
    const name = this.saveFilterName().trim().toLowerCase();
    if (!name) return false;
    return this.savedFilters().some(f => f.name.toLowerCase() === name);
  });

  /** Whether the typed rename conflicts with a *different* existing filter */
  renameDuplicateExists = computed(() => {
    const name = this.renameFilterName().trim().toLowerCase();
    const id = this.selectedFilterId();
    if (!name || !id) return false;
    return this.savedFilters().some(f => f.id !== id && f.name.toLowerCase() === name);
  });

  /** Derive SelectButton / Select options from saved filters */
  filterOptions = computed(() =>
    this.savedFilters().map(f => ({ label: f.name, value: f.id }))
  );

  /** Switch to dropdown when more than 4 saved filters */
  useDropdown = computed(() => this.savedFilters().length > 4);

  /** Whether there is a selected saved filter (for enabling delete) */
  hasSelectedFilter = computed(() => this.selectedFilterId() !== null);

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

  /** Count of individual filter fields that are actively applied */
  activeFilterCount = computed(() => {
    let count = 0;
    for (const f of this.autocompleteFilters) {
      if (f.selectedValues.length > 0) count++;
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

  constructor() {
    effect(() => {
      const id = this.selectedFilterId();
      if (!id) return;
      const filter = this.savedFilters().find(f => f.id === id);
      if (!filter) return;
      this.restoreFilter(filter);
    });
  }

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
    this.expanded.set(false);
  }

  onSaveAndApply(): void {
    this.saveFilterName.set('');
    this.showSaveDialog.set(true);
  }

  onConfirmSave(): void {
    const name = this.saveFilterName().trim();
    if (!name || this.duplicateExists()) return;
    this.createNewFilter(name);
  }

  onReplace(): void {
    const name = this.saveFilterName().trim().toLowerCase();
    const existing = this.savedFilters().find(f => f.name.toLowerCase() === name);
    if (!existing) return;

    this.savedFilters.update(filters =>
      filters.map(f =>
        f.id === existing.id
          ? { ...f, autocompleteValues: this.snapshotAutocompleteValues(), toggleValues: this.snapshotToggleValues() }
          : f
      )
    );
    this.selectedFilterId.set(existing.id);
    this.showSaveDialog.set(false);
    this.expanded.set(false);
  }

  onRename(): void {
    if (!this.selectedFilterId()) return;
    this.renameFilterName.set(this.selectedFilterName());
    this.showRenameDialog.set(true);
  }

  onConfirmRename(): void {
    const name = this.renameFilterName().trim();
    const id = this.selectedFilterId();
    if (!name || !id || this.renameDuplicateExists()) return;

    this.savedFilters.update(filters =>
      filters.map(f => f.id === id ? { ...f, name } : f)
    );
    this.showRenameDialog.set(false);
  }

  onDelete(): void {
    if (!this.selectedFilterId()) return;
    this.showDeleteDialog.set(true);
  }

  onConfirmDelete(): void {
    const id = this.selectedFilterId();
    if (!id) return;

    this.savedFilters.update(filters => filters.filter(f => f.id !== id));
    const remaining = this.savedFilters();
    this.selectedFilterId.set(remaining.length > 0 ? remaining[0].id : null);
    this.showDeleteDialog.set(false);
  }

  onCancel(): void {
    this.expanded.set(false);
  }

  onFilterSelect(id: string | null): void {
    this.selectedFilterId.set(id);
  }

  selectedFilterName(): string {
    const id = this.selectedFilterId();
    if (!id) return '';
    return this.savedFilters().find(f => f.id === id)?.name ?? '';
  }

  private createNewFilter(name: string): void {
    const newFilter: SavedFilter = {
      id: crypto.randomUUID(),
      name,
      autocompleteValues: this.snapshotAutocompleteValues(),
      toggleValues: this.snapshotToggleValues()
    };

    this.savedFilters.update(filters => [...filters, newFilter]);
    this.selectedFilterId.set(newFilter.id);
    this.showSaveDialog.set(false);
    this.expanded.set(false);
  }

  private snapshotAutocompleteValues(): Record<string, string[]> {
    const snapshot: Record<string, string[]> = {};
    for (const f of this.autocompleteFilters) {
      snapshot[f.id] = [...f.selectedValues];
    }
    return snapshot;
  }

  private snapshotToggleValues(): Record<string, boolean> {
    const snapshot: Record<string, boolean> = {};
    for (const t of this.toggleFilters) {
      snapshot[t.id] = t.value;
    }
    return snapshot;
  }

  private restoreFilter(saved: SavedFilter): void {
    for (const f of this.autocompleteFilters) {
      if (saved.autocompleteValues[f.id]) {
        f.selectedValues = [...saved.autocompleteValues[f.id]];
      }
    }
    for (const t of this.toggleFilters) {
      if (saved.toggleValues[t.id] !== undefined) {
        t.value = saved.toggleValues[t.id];
      }
    }
  }
}
