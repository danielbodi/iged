import { Component, input, output, signal, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpandableSearchComponent } from '../expandable-search/expandable-search.component';

export interface SecondLevelSection {
  id: string;
  label: string;
  collapsed: boolean;
  items: SecondLevelMenuItem[];
}

export interface SecondLevelMenuItem {
  id: string;
  label: string;
  count?: number;
  attention?: boolean;
}

@Component({
  selector: 'app-second-level-nav',
  standalone: true,
  imports: [NgClass, FormsModule, ExpandableSearchComponent],
  templateUrl: './second-level-nav.component.html'
})
export class SecondLevelNavComponent {
  expanded = input(false);
  activeSectionId = input<string | null>(null);
  itemClick = output<void>();
  close = output<void>();

  /** Whether the search input is expanded (replaces the title) */
  searchExpanded = signal(false);
  searchQuery = signal('');

  /** Active menu item – default to AT & DC - Demande de paiement (IND) */
  activeItemId = signal<string | null>('at-dc-demande');

  /** Menu structure: sections with grouped items (from Figma 692-24851) */
  sections: SecondLevelSection[] = [
    {
      id: 'autres',
      label: 'AUTRES',
      collapsed: false,
      items: [
        { id: 'remboursements-164', label: 'Remboursements 164 (U6F44)' },
        { id: 'risques-sociaux', label: 'Risques sociaux' },
        { id: 'actes-naissance', label: 'Actes de naissance' },
        { id: 'administration-mc', label: 'Administration MC (ADM)' },
        { id: 'at-dc-demande', label: 'AT & DC - Demande de paiement' },
        { id: 'at-dc-mp-rente', label: 'AT, DC & MP - Rente (IND)' },
        { id: 'attestations-vacances', label: 'Attestations de vacances' },
        { id: 'autorisation-tp', label: 'Autorisation T.P. (ADM)' },
        { id: 'courriers-entrants', label: 'Courriers entrants' },
        { id: 'dossiers-ffe', label: 'Dossiers FFE (IND)' },
        { id: 'declaration-revenus', label: 'Déclaration de revenus (225)' },
        { id: 'detention', label: 'Détention' },
        { id: 'feuilles-renseignements', label: 'Feuilles de renseignements' },
        { id: 'fraude-sociale', label: 'Fraude Sociale' }
      ]
    },
    {
      id: 'encodage',
      label: 'ENCODAGE',
      collapsed: false,
      items: [
        { id: 'encodage-documents', label: 'Encodage des documents' },
        { id: 'encodage-indus', label: 'Encodage des indus' }
      ]
    },
    {
      id: 'gestion',
      label: 'GESTION',
      collapsed: false,
      items: [
        { id: 'gestion-calcs', label: "Gestion des CALC's" },
        { id: 'gestion-cartes-reprise', label: 'Gestion des cartes de reprise' },
        { id: 'gestion-certificats-itt', label: 'Gestion des certificats ITT' },
        { id: 'gestion-comptes-bancaires', label: 'Gestion des comptes bancaires' },
        { id: 'gestion-flux-z100', label: 'Gestion des flux Z100' },
        { id: 'gestion-indus', label: 'Gestion des indus' },
        { id: 'gestion-listes', label: 'Gestion des listes' },
        { id: 'gestion-listes-medicales', label: 'Gestion des listes médicales' },
        { id: 'gestion-proratas', label: 'Gestion des proratas' },
        { id: 'gestion-rejets-macro', label: 'Gestion des rejets MACRO' }
      ]
    }
  ];

  /** Title derived from the active first-level section */
  title = computed(() => {
    const id = this.activeSectionId();
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      ac: 'A.C.',
      soins: 'Soins de santé',
      medical: 'Médical',
      indemnites: 'Indemnités',
      juridique: 'Juridique',
      population: 'Population'
    };
    return id ? titles[id] ?? id : 'Menu';
  });

  /** Filtered sections based on search query */
  filteredSections = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.sections;

    return this.sections
      .map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.label.toLowerCase().includes(q)
        )
      }))
      .filter(section => section.items.length > 0);
  });

  onSearchExpandedChange(expanded: boolean): void {
    this.searchExpanded.set(expanded);
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  toggleSection(section: SecondLevelSection): void {
    section.collapsed = !section.collapsed;
  }

  /** Only 'at-dc-demande' is an active route for now */
  onItemClick(itemId: string): void {
    if (itemId !== 'at-dc-demande') return;
    this.activeItemId.set(itemId);
    this.itemClick.emit();
  }
}
