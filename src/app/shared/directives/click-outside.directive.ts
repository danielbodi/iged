import { Directive, ElementRef, output, OnDestroy, OnInit, NgZone } from '@angular/core';

/**
 * Reusable directive that emits when a click occurs outside the host element.
 *
 * Usage:
 *   <div appClickOutside (clickOutside)="onClickOutside()">...</div>
 */
@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  clickOutside = output<void>();

  private listener!: (event: MouseEvent) => void;

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    // Run outside Angular zone to avoid unnecessary change detection
    this.zone.runOutsideAngular(() => {
      this.listener = (event: MouseEvent) => {
        const target = event.target as Node;
        if (!this.el.nativeElement.contains(target)) {
          this.zone.run(() => this.clickOutside.emit());
        }
      };
      document.addEventListener('click', this.listener, true);
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.listener, true);
  }
}
