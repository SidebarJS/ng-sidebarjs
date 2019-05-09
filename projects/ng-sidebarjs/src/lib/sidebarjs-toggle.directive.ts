import { Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { HTMLSidebarElement, SidebarService } from 'sidebarjs';

@Directive({
  selector: '[sidebarjsToggle]',
})
export class SidebarToggleDirective implements OnDestroy {
  @Input() sidebarjsToggle = '';

  private readonly destroyListener = this.renderer.listen(
    this.elementRef.nativeElement,
    'click',
    ({target}: Event) => {
      if (!this.sidebarService.elemHasListener(target as HTMLSidebarElement)) {
        this.sidebarService.toggle(this.sidebarjsToggle);
      }
    });

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef<Element>,
  ) {
  }

  public ngOnDestroy(): void {
    this.destroyListener();
  }
}
