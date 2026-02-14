import { Component, input, output, signal, ElementRef, viewChild, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

/**
 * Reusable expandable search component.
 *
 * Collapsed: shows a search icon button.
 * Expanded:  shows a PrimeNG search input with icon.
 * Collapses on click outside or Escape key.
 *
 * Usage:
 *   <app-expandable-search
 *     placeholder="Rechercher..."
 *     (search)="onSearch($event)"
 *   />
 */
@Component({
  selector: 'app-expandable-search',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    ClickOutsideDirective
  ],
  template: `
    <div
      class="c-expandable-search"
      [class.c-expandable-search--expanded]="expanded()"
      appClickOutside
      (clickOutside)="collapse()"
    >
      @if (expanded()) {
        <div class="c-expandable-search__field">
          <p-iconfield iconPosition="left">
            <p-inputicon styleClass="pi pi-search" />
            <input
              #searchInput
              type="text"
              pInputText
              [placeholder]="placeholder()"
              [ngModel]="query()"
              (ngModelChange)="onQueryChange($event)"
              (keydown.escape)="collapse()"
              class="c-expandable-search__input"
            />
          </p-iconfield>
          @if (query()) {
            <button type="button" class="c-expandable-search__clear" (click)="onQueryChange('')" aria-label="Effacer">
              <i class="pi pi-times"></i>
            </button>
          }
        </div>
      } @else {
        <p-button
          icon="bi bi-search"
          [text]="true"
          (onClick)="expand()"
          [ariaLabel]="ariaLabel()"
        />
      }
    </div>
  `
})
export class ExpandableSearchComponent {
  /** Placeholder text for the search input */
  placeholder = input('Rechercher...');

  /** Accessible label for the icon button */
  ariaLabel = input('Rechercher');

  /** Emits the search query on each change */
  search = output<string>();

  /** Emits when the expanded state changes */
  expandedChange = output<boolean>();

  expanded = signal(false);
  query = signal('');

  private searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  constructor() {
    // Auto-focus input when expanded
    effect(() => {
      const inputEl = this.searchInput();
      if (inputEl && this.expanded()) {
        // Timeout to wait for the DOM to render
        setTimeout(() => inputEl.nativeElement.focus(), 0);
      }
    });
  }

  expand(): void {
    this.expanded.set(true);
    this.expandedChange.emit(true);
  }

  collapse(): void {
    if (!this.expanded()) return;
    this.expanded.set(false);
    this.query.set('');
    this.search.emit('');
    this.expandedChange.emit(false);
  }

  onQueryChange(value: string): void {
    this.query.set(value);
    this.search.emit(value);
  }
}
