import { Component, signal, computed } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { PaginatorModule } from 'primeng/paginator';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

export interface DocumentRow {
  id: number;
  oa: number;
  ter: number;
  source: string;
  identification: string;
  nom: string;
  type: string;
  dateReception: string;
}

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [TableModule, ButtonModule, BadgeModule, PaginatorModule, MenuModule],
  templateUrl: './dashboard-card.component.html'
})
export class DashboardCardComponent {
  hoveredRowId = signal<number | null>(null);

  /** Three-dots menu items */
  cardMenuItems: MenuItem[] = [
    { label: 'Exporter', icon: 'bi bi-download' },
    { label: 'Imprimer', icon: 'bi bi-printer' },
    { separator: true },
    { label: 'Paramètres', icon: 'bi bi-gear' }
  ];

  /** Pagination state */
  first = signal(0);
  rowsPerPage = signal(10);

  /** Total number of results */
  totalRecords = computed(() => this.allRows.length);

  /** Badge label */
  totalLabel = computed(() => `${this.totalRecords()} résultats`);

  /** Column definitions */
  columns: { field: keyof DocumentRow; header: string }[] = [
    { field: 'oa', header: 'O.A' },
    { field: 'ter', header: 'Ter.' },
    { field: 'source', header: 'Source' },
    { field: 'identification', header: 'Identification' },
    { field: 'nom', header: 'Nom' },
    { field: 'type', header: 'Type' },
    { field: 'dateReception', header: 'Date de réception' }
  ];

  /** Mock data matching the Figma design */
  allRows: DocumentRow[] = [
    { id: 1,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830724-2', nom: 'Alice, Johnson',     type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-24 14:32' },
    { id: 2,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830725-3', nom: 'Eva, Martinez',      type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-24 14:32' },
    { id: 3,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830726-4', nom: 'David, Garcia',      type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-24 14:32' },
    { id: 4,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830727-5', nom: 'Henry, Taylor',      type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-24 14:32' },
    { id: 5,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830728-6', nom: 'Grace, Anderson',    type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-24 14:32' },
    { id: 6,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830729-7', nom: 'Isabella, Thomas',   type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-24 14:32' },
    { id: 7,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830730-8', nom: 'Catherine, Davis',   type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-24 14:32' },
    { id: 8,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830731-9', nom: 'Frank, Wilson',      type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-24 14:32' },
    { id: 9,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830732-0', nom: 'Brian, Smith',       type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-24 14:32' },
    { id: 10, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830733-0', nom: 'Brian, Smith',       type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-24 14:32' },
    // Extra rows to demonstrate pagination
    { id: 11, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830734-1', nom: 'Laura, Brown',       type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-25 09:15' },
    { id: 12, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830735-2', nom: 'Peter, Williams',    type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-25 09:15' },
    { id: 13, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830736-3', nom: 'Sophie, Jones',      type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-25 10:20' },
    { id: 14, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830737-4', nom: 'Marc, Miller',       type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-25 10:20' },
    { id: 15, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830738-5', nom: 'Julie, Davis',       type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-25 11:45' },
    { id: 16, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830739-6', nom: 'Thomas, Moore',      type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-25 11:45' },
    { id: 17, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830740-7', nom: 'Anne, Taylor',       type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-26 08:00' },
    { id: 18, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830741-8', nom: 'Robert, Anderson',   type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-26 08:00' },
    { id: 19, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830742-9', nom: 'Claire, Thomas',     type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-26 09:30' },
    { id: 20, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830743-0', nom: 'Jean, Jackson',      type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-26 09:30' },
    { id: 21, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830744-1', nom: 'Marie, White',       type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-26 14:00' },
    { id: 22, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830745-2', nom: 'Paul, Harris',       type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-26 14:00' },
    { id: 23, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830746-3', nom: 'Emma, Martin',       type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-27 08:45' },
    { id: 24, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830747-4', nom: 'Lucas, Garcia',      type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-27 08:45' },
    { id: 25, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830748-5', nom: 'Sarah, Robinson',    type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-27 10:10' },
    { id: 26, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830749-6', nom: 'Nicolas, Clark',     type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-27 10:10' },
    { id: 27, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830750-7', nom: 'Isabelle, Lewis',    type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-27 11:30' },
    { id: 28, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830751-8', nom: 'Antoine, Walker',    type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-27 11:30' },
    { id: 29, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830752-9', nom: 'Charlotte, Hall',    type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-28 08:00' },
    { id: 30, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830753-0', nom: 'Vincent, Allen',     type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-28 08:00' },
    { id: 31, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830754-1', nom: 'Camille, Young',     type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-28 09:15' },
    { id: 32, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830755-2', nom: 'Hugo, King',         type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-28 09:15' },
    { id: 33, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830756-3', nom: 'Léa, Wright',        type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-28 10:30' },
    { id: 34, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830757-4', nom: 'Gabriel, Lopez',     type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-28 10:30' },
    { id: 35, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830758-5', nom: 'Manon, Hill',        type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-28 14:00' },
    { id: 36, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830759-6', nom: 'Raphaël, Scott',     type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-28 14:00' },
    { id: 37, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830760-7', nom: 'Inès, Green',        type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-29 08:00' },
    { id: 38, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830761-8', nom: 'Maxime, Adams',      type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-29 08:00' },
    { id: 39, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830762-9', nom: 'Zoé, Baker',         type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2023-07-29 09:00' },
    { id: 40, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830763-0', nom: 'Arthur, Gonzalez',   type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2023-07-29 09:00' }
  ];

  onPageChange(event: { first: number; rows: number }): void {
    this.first.set(event.first);
    this.rowsPerPage.set(event.rows);
  }

  onRowMouseEnter(id: number): void {
    this.hoveredRowId.set(id);
  }

  onRowMouseLeave(): void {
    this.hoveredRowId.set(null);
  }
}
