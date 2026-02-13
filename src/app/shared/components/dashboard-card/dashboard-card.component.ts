import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

interface TableRow {
  id: string;
  reference: string;
  beneficiaire: string;
  type: string;
  statut: string;
  montant: string;
  dateCreation: string;
  echeance: string;
}

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [CardModule, TableModule, ButtonModule],
  templateUrl: './dashboard-card.component.html'
})
export class DashboardCardComponent {
  hoveredRowId = signal<string | null>(null);

  columns = [
    { field: 'reference', header: 'Référence' },
    { field: 'beneficiaire', header: 'Bénéficiaire' },
    { field: 'type', header: 'Type' },
    { field: 'statut', header: 'Statut' },
    { field: 'montant', header: 'Montant' },
    { field: 'dateCreation', header: 'Date création' },
    { field: 'echeance', header: 'Échéance' }
  ];

  rows: TableRow[] = [
    { id: '1', reference: 'IND-2024-001', beneficiaire: 'Dupont Jean', type: 'Maladie', statut: 'En cours', montant: '1.250,00 €', dateCreation: '15/01/2024', echeance: '15/02/2024' },
    { id: '2', reference: 'IND-2024-002', beneficiaire: 'Martin Sophie', type: 'Accident', statut: 'En attente', montant: '3.780,50 €', dateCreation: '16/01/2024', echeance: '16/02/2024' },
    { id: '3', reference: 'IND-2024-003', beneficiaire: 'Leroy Michel', type: 'Invalidité', statut: 'Terminé', montant: '892,00 €', dateCreation: '17/01/2024', echeance: '17/02/2024' },
    { id: '4', reference: 'IND-2024-004', beneficiaire: 'Bernard Claire', type: 'Maladie', statut: 'En cours', montant: '2.100,00 €', dateCreation: '18/01/2024', echeance: '18/02/2024' },
    { id: '5', reference: 'IND-2024-005', beneficiaire: 'Petit François', type: 'Maternité', statut: 'En attente', montant: '4.500,00 €', dateCreation: '19/01/2024', echeance: '19/02/2024' },
    { id: '6', reference: 'IND-2024-006', beneficiaire: 'Moreau Anne', type: 'Maladie', statut: 'Archivé', montant: '670,25 €', dateCreation: '20/01/2024', echeance: '20/02/2024' },
    { id: '7', reference: 'IND-2024-007', beneficiaire: 'Durand Pierre', type: 'Accident', statut: 'En cours', montant: '1.890,00 €', dateCreation: '21/01/2024', echeance: '21/02/2024' },
    { id: '8', reference: 'IND-2024-008', beneficiaire: 'Simon Marie', type: 'Invalidité', statut: 'Brouillon', montant: '5.230,75 €', dateCreation: '22/01/2024', echeance: '22/02/2024' }
  ];

  onRowMouseEnter(id: string): void {
    this.hoveredRowId.set(id);
  }

  onRowMouseLeave(): void {
    this.hoveredRowId.set(null);
  }
}
