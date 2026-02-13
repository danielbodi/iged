import { Injectable, signal, computed } from '@angular/core';

export interface FirstLevelNavItem {
  id: string;
  icon: string;
  label: string;
  externalLink?: string;
  section?: string;
}

export interface SecondLevelNavItem {
  id: string;
  label: string;
  count?: number;
  attention?: boolean;
}

@Injectable({ providedIn: 'root' })
export class DashboardLayoutService {
  private _secondLevelExpanded = signal(false);
  private _activeFirstLevelId = signal<string | null>(null);
  private _firstLevelHoveredId = signal<string | null>(null);

  readonly secondLevelExpanded = this._secondLevelExpanded.asReadonly();
  readonly activeFirstLevelId = this._activeFirstLevelId.asReadonly();
  readonly firstLevelHoveredId = this._firstLevelHoveredId.asReadonly();

  toggleSecondLevel(): void {
    this._secondLevelExpanded.update((v) => !v);
  }

  expandSecondLevel(sectionId: string): void {
    this._activeFirstLevelId.set(sectionId);
    this._secondLevelExpanded.set(true);
  }

  collapseSecondLevel(): void {
    this._secondLevelExpanded.set(false);
    this._activeFirstLevelId.set(null);
  }

  setFirstLevelHovered(id: string | null): void {
    this._firstLevelHoveredId.set(id);
  }

  onSecondLevelItemClick(): void {
    this.collapseSecondLevel();
  }
}
