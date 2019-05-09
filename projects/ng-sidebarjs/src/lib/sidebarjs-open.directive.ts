import { Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { SidebarjsService, HTMLSidebarElement } from './sidebarjs.service';

@Directive({
  selector: '[sidebarjsOpen]',
})
export class SidebarjsOpenDirective implements OnDestroy {
  @Input() sidebarjsOpen = '';

  private readonly destroyListener = this.renderer.listen(
    this.elementRef.nativeElement,
    'click',
    ({target}: Event) => {
      if (!this.sidebarjsService.elemHasListener(target as HTMLSidebarElement)) {
        this.sidebarjsService.open(this.sidebarjsOpen);
      }
    });

  constructor(
    private readonly sidebarjsService: SidebarjsService,
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef<Element>,
  ) {
  }

  public ngOnDestroy(): void {
    this.destroyListener();
  }
}
