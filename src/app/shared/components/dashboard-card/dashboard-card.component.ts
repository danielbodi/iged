import { Component, signal, computed } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { PaginatorModule } from 'primeng/paginator';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';
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
  dateEntree: string;
  dateEtat: string;
}

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [TableModule, ButtonModule, BadgeModule, PaginatorModule, MenuModule, TagModule],
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
    { field: 'dateReception', header: 'Date de réception' },
    { field: 'dateEntree', header: "Date d'entrée" },
    { field: 'dateEtat', header: 'Date état' }
  ];

  /** Mock data matching the Figma design */
  allRows: DocumentRow[] = [
    { id: 1,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830724-2', nom: 'Alice, Johnson',     type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-06-27 12:20:03', dateEntree: '2025-06-27 13:50:30', dateEtat: '2026-02-16 13:36:59' },
    { id: 2,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830725-3', nom: 'Eva, Martinez',      type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-07-01 13:56:55', dateEntree: '2025-07-02 14:20:38', dateEtat: '2026-02-16 13:36:59' },
    { id: 3,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830726-4', nom: 'David, Garcia',      type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-07-01 15:28:08', dateEntree: '2025-07-02 12:18:10', dateEtat: '2026-02-16 13:36:59' },
    { id: 4,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830727-5', nom: 'Henry, Taylor',      type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-07-11 14:10:47', dateEntree: '2025-07-15 09:38:26', dateEtat: '2026-02-16 13:36:59' },
    { id: 5,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830728-6', nom: 'Grace, Anderson',    type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-07-15 13:50:54', dateEntree: '2025-07-15 13:53:12', dateEtat: '2026-02-16 13:36:59' },
    { id: 6,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830729-7', nom: 'Isabella, Thomas',   type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-07-16 09:55:35', dateEntree: '2025-07-16 09:58:57', dateEtat: '2026-02-16 13:36:59' },
    { id: 7,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830730-8', nom: 'Catherine, Davis',   type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-08-01 11:55:34', dateEntree: '2025-08-01 11:58:21', dateEtat: '2026-02-16 13:36:59' },
    { id: 8,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830731-9', nom: 'Frank, Wilson',      type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-08-25 10:45:39', dateEntree: '2025-08-25 12:18:18', dateEtat: '2026-02-16 13:36:59' },
    { id: 9,  oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830732-0', nom: 'Brian, Smith',       type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-08-27 17:50:33', dateEntree: '2025-08-27 17:50:45', dateEtat: '2026-02-16 13:36:59' },
    { id: 10, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830733-0', nom: 'Brian, Smith',       type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-08-29 16:10:52', dateEntree: '2025-08-29 16:13:05', dateEtat: '2026-02-16 13:36:59' },
    { id: 11, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830734-1', nom: 'Laura, Brown',       type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-09-01 09:15:22', dateEntree: '2025-09-01 09:18:44', dateEtat: '2026-02-16 13:36:59' },
    { id: 12, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830735-2', nom: 'Peter, Williams',    type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-09-02 14:30:10', dateEntree: '2025-09-02 14:33:28', dateEtat: '2026-02-16 13:36:59' },
    { id: 13, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830736-3', nom: 'Sophie, Jones',      type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-09-05 10:20:15', dateEntree: '2025-09-05 10:22:40', dateEtat: '2026-02-16 13:36:59' },
    { id: 14, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830737-4', nom: 'Marc, Miller',       type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-09-08 10:20:33', dateEntree: '2025-09-08 10:24:01', dateEtat: '2026-02-16 13:36:59' },
    { id: 15, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830738-5', nom: 'Julie, Davis',       type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-09-10 11:45:07', dateEntree: '2025-09-10 11:48:19', dateEtat: '2026-02-16 13:36:59' },
    { id: 16, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830739-6', nom: 'Thomas, Moore',      type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-09-12 11:45:50', dateEntree: '2025-09-12 11:48:02', dateEtat: '2026-02-16 13:36:59' },
    { id: 17, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830740-7', nom: 'Anne, Taylor',       type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-09-15 08:00:12', dateEntree: '2025-09-15 08:03:45', dateEtat: '2026-02-16 13:36:59' },
    { id: 18, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830741-8', nom: 'Robert, Anderson',   type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-09-17 08:00:55', dateEntree: '2025-09-17 08:04:10', dateEtat: '2026-02-16 13:36:59' },
    { id: 19, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830742-9', nom: 'Claire, Thomas',     type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-09-19 09:30:28', dateEntree: '2025-09-19 09:33:41', dateEtat: '2026-02-16 13:36:59' },
    { id: 20, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830743-0', nom: 'Jean, Jackson',      type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-09-22 09:30:14', dateEntree: '2025-09-22 09:34:50', dateEtat: '2026-02-16 13:36:59' },
    { id: 21, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830744-1', nom: 'Marie, White',       type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-09-25 14:00:33', dateEntree: '2025-09-25 14:03:18', dateEtat: '2026-02-16 13:36:59' },
    { id: 22, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830745-2', nom: 'Paul, Harris',       type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-09-29 14:00:47', dateEntree: '2025-09-29 14:04:22', dateEtat: '2026-02-16 13:36:59' },
    { id: 23, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830746-3', nom: 'Emma, Martin',       type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-10-01 08:45:09', dateEntree: '2025-10-01 08:48:32', dateEtat: '2026-02-16 13:36:59' },
    { id: 24, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830747-4', nom: 'Lucas, Garcia',      type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-10-03 08:45:55', dateEntree: '2025-10-03 08:49:11', dateEtat: '2026-02-16 13:36:59' },
    { id: 25, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830748-5', nom: 'Sarah, Robinson',    type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-10-06 10:10:20', dateEntree: '2025-10-06 10:13:45', dateEtat: '2026-02-16 13:36:59' },
    { id: 26, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830749-6', nom: 'Nicolas, Clark',     type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-10-08 10:10:38', dateEntree: '2025-10-08 10:14:02', dateEtat: '2026-02-16 13:36:59' },
    { id: 27, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830750-7', nom: 'Isabelle, Lewis',    type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-10-10 11:30:15', dateEntree: '2025-10-10 11:33:28', dateEtat: '2026-02-16 13:36:59' },
    { id: 28, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830751-8', nom: 'Antoine, Walker',    type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-10-13 11:30:42', dateEntree: '2025-10-13 11:34:10', dateEtat: '2026-02-16 13:36:59' },
    { id: 29, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830752-9', nom: 'Charlotte, Hall',    type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-10-15 08:00:05', dateEntree: '2025-10-15 08:03:22', dateEtat: '2026-02-16 13:36:59' },
    { id: 30, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830753-0', nom: 'Vincent, Allen',     type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-10-17 08:00:50', dateEntree: '2025-10-17 08:04:15', dateEtat: '2026-02-16 13:36:59' },
    { id: 31, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830754-1', nom: 'Camille, Young',     type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-10-20 09:15:18', dateEntree: '2025-10-20 09:18:33', dateEtat: '2026-02-16 13:36:59' },
    { id: 32, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830755-2', nom: 'Hugo, King',         type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-10-22 09:15:41', dateEntree: '2025-10-22 09:19:05', dateEtat: '2026-02-16 13:36:59' },
    { id: 33, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830756-3', nom: 'Léa, Wright',        type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-10-24 10:30:09', dateEntree: '2025-10-24 10:33:25', dateEtat: '2026-02-16 13:36:59' },
    { id: 34, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830757-4', nom: 'Gabriel, Lopez',     type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-10-27 10:30:44', dateEntree: '2025-10-27 10:34:12', dateEtat: '2026-02-16 13:36:59' },
    { id: 35, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830758-5', nom: 'Manon, Hill',        type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-10-29 14:00:22', dateEntree: '2025-10-29 14:03:38', dateEtat: '2026-02-16 13:36:59' },
    { id: 36, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830759-6', nom: 'Raphaël, Scott',     type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-11-03 14:00:55', dateEntree: '2025-11-03 14:04:20', dateEtat: '2026-02-16 13:36:59' },
    { id: 37, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830760-7', nom: 'Inès, Green',        type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-11-05 08:00:10', dateEntree: '2025-11-05 08:03:28', dateEtat: '2026-02-16 13:36:59' },
    { id: 38, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830761-8', nom: 'Maxime, Adams',      type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-11-07 08:00:48', dateEntree: '2025-11-07 08:04:05', dateEtat: '2026-02-16 13:36:59' },
    { id: 39, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830762-9', nom: 'Zoé, Baker',         type: 'AT - demande de paiement IND (INDPMTAT)',  dateReception: '2025-11-10 09:00:17', dateEntree: '2025-11-10 09:03:40', dateEtat: '2026-02-16 13:36:59' },
    { id: 40, oa: 319, ter: 315, source: 'ATDCCTX', identification: '4673343-19830763-0', nom: 'Arthur, Gonzalez',   type: 'DC - demande de paiement IND (INDPMTDC)',  dateReception: '2025-11-12 09:00:52', dateEntree: '2025-11-12 09:04:15', dateEtat: '2026-02-16 13:36:59' }
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
