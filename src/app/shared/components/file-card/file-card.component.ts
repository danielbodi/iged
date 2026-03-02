import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

export interface FileCardData {
  /** Unique sub-item id (e.g. 'at-dc-demande') */
  id: string;
  /** Sub-item label (card title, e.g. 'Demande de paiement') */
  title: string;
  /** Parent section label (shown in tag, e.g. 'Indemnités') */
  sectionLabel: string;
  /** Bootstrap icon class for the section (e.g. 'bi-calculator') */
  sectionIcon: string;
  /** Whether this card is marked as favorite */
  favorite: boolean;
  /** KPI values */
  recus: number;
  attribues: number;
  enTraitement: number;
  incomplets: number;
  rappels: number;
  clotures: number;
}

@Component({
  selector: 'app-file-card',
  standalone: true,
  imports: [NgClass, ButtonModule, TagModule],
  templateUrl: './file-card.component.html',
})
export class FileCardComponent {
  /** Card data */
  data = input.required<FileCardData>();

  /** Whether this is the favorite variant (different bg) */
  favoriteBg = input<boolean>(false);

  /** Emitted when user toggles favorite */
  favoriteToggle = output<string>();

  /** Emitted when user clicks a status link */
  statusClick = output<{ itemId: string; status: string }>();

  private readonly _kpiKeys = [
    'recus',
    'attribues',
    'enTraitement',
    'incomplets',
    'rappels',
    'clotures',
  ] as const;
  private _KpiKey!: (typeof this._kpiKeys)[number];

  readonly topRow: {
    key: keyof Pick<FileCardData, 'recus' | 'attribues' | 'rappels'>;
    label: string;
  }[] = [
    { key: 'recus', label: 'Reçus' },
    { key: 'attribues', label: 'Attribués' },
    { key: 'rappels', label: 'Rappels' },
  ];

  readonly bottomRow: {
    key: keyof Pick<FileCardData, 'enTraitement' | 'incomplets' | 'clotures'>;
    label: string;
  }[] = [
    { key: 'enTraitement', label: 'En traitement' },
    { key: 'incomplets', label: 'Incomplets' },
    { key: 'clotures', label: 'Clôturés' },
  ];

  onFavoriteClick(): void {
    this.favoriteToggle.emit(this.data().id);
  }

  onStatusClick(statusKey: string): void {
    this.statusClick.emit({ itemId: this.data().id, status: statusKey });
  }
}
