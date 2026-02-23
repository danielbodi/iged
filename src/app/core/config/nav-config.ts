/**
 * Shared navigation configuration for first-level and second-level menus.
 * Used by first-level-nav, second-level-nav, and dashboard-overview.
 */

export interface FirstLevelNavItem {
  id: string;
  icon: string;
  label: string;
}

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

export const FIRST_LEVEL_ITEMS: FirstLevelNavItem[] = [
  { id: 'dashboard', icon: 'bi-columns', label: 'Dashboard' },
  { id: 'ac', icon: 'bi-shield-plus', label: 'A.C.' },
  { id: 'soins', icon: 'bi-heart-pulse', label: 'Soins de santé' },
  { id: 'medical', icon: 'bi-hospital', label: 'Médical' },
  { id: 'indemnites', icon: 'bi-calculator', label: 'Indemnités' },
  { id: 'juridique', icon: 'bi-book', label: 'Juridique' },
  { id: 'population', icon: 'bi-person-vcard', label: 'Population' }
];

const DASHBOARD_SECTIONS: SecondLevelSection[] = [
  {
    id: 'dashboard-overview',
    label: 'DASHBOARD',
    collapsed: false,
    items: [
      { id: 'vue-ensemble', label: "Vue d'ensemble" },
      { id: 'mon-panier', label: 'Mon panier' },
      { id: 'abonnements-alertes', label: 'Abonnements et alertes' }
    ]
  }
];

const INDEMNITES_SECTIONS: SecondLevelSection[] = [
  {
    id: 'at-dc',
    label: 'AT & DC',
    collapsed: false,
    items: [
      { id: 'at-dc-demande', label: 'Demande de paiement' },
      { id: 'at-dc-mp-rente', label: 'Rente (IND)' }
    ]
  },
  {
    id: 'autres',
    label: 'AUTRES',
    collapsed: false,
    items: [
      { id: 'remboursements-164', label: 'Remboursements 164 (U6F44)' },
      { id: 'risques-sociaux', label: 'Risques sociaux' },
      { id: 'actes-naissance', label: 'Actes de naissance' },
      { id: 'administration-mc', label: 'Administration MC (ADM)' },
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

/** Sections by first-level id. Empty for sections without second-level data. */
export const SECTIONS_BY_FIRST_LEVEL: Record<string, SecondLevelSection[]> = {
  dashboard: DASHBOARD_SECTIONS,
  ac: [],
  soins: [],
  medical: [],
  indemnites: INDEMNITES_SECTIONS,
  juridique: [],
  population: []
};

/** Mock flat items for first-level sections that have no second-level data. */
const MOCK_FLAT_ITEMS: SecondLevelMenuItem[] = [
  { id: 'mock-1', label: 'Feuilles de renseignements' },
  { id: 'mock-2', label: 'Certificats ITT' },
  { id: 'mock-3', label: 'Cartes de reprise' },
  { id: 'mock-4', label: "Gestion des CALC's" },
  { id: 'mock-5', label: 'Dossiers urgents' },
  { id: 'mock-6', label: 'Demandes opérationnelles' },
  { id: 'mock-7', label: 'Remboursements AO/AC' },
  { id: 'mock-8', label: 'Affiliations CI' },
  { id: 'mock-9', label: 'Attestations de vacances' },
  { id: 'mock-10', label: 'Gestion des Accords' }
];

/** Route mapping for second-level menu items that have dedicated routes. */
export const SECOND_LEVEL_ROUTES: Record<string, string> = {
  'vue-ensemble': '/dashboard/vue-ensemble',
  'at-dc-demande': '/'
};

/** Derive the active second-level item id from the current URL path. */
export function getActiveItemIdFromUrl(url: string): string | null {
  const path = url.split('?')[0];
  for (const [itemId, route] of Object.entries(SECOND_LEVEL_ROUTES)) {
    if (path === route || path.startsWith(route + '/')) return itemId;
  }
  return null;
}

/** Flatten all second-level menu items for a first-level id. Uses mock data when empty. */
export function getFlatItemsForFirstLevel(firstLevelId: string): SecondLevelMenuItem[] {
  const sections = SECTIONS_BY_FIRST_LEVEL[firstLevelId] ?? [];
  const items = sections.flatMap((s) => s.items);
  return items.length > 0 ? items : MOCK_FLAT_ITEMS;
}
