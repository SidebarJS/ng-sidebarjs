import { Directive, HostListener, Input } from '@angular/core';
import { HTMLSidebarElement, SidebarService } from "sidebarjs";

@Directive({
  selector: '[ngSidebarjsToggle]'
})
export class SidebarjsToggleDirective {

  @Input()
  sidebarjsToggle = '';

  @HostListener('click', ['$event.target'])
  toggle(element: HTMLSidebarElement): void {
    if (!this.sidebarService.elemHasListener(element)) {
      this.sidebarService.toggle(this.sidebarjsToggle);
    }
  }

  constructor(private sidebarService: SidebarService) {
  }
}
