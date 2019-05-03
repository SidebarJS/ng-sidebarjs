import { Directive, HostListener, Input } from '@angular/core';
import { HTMLSidebarElement } from "sidebarjs";
import './../si'

@Directive({
  selector: '[ngSidebarjsToggle]'
})
export class SidebarjsToggleDirective {

  @Input()
  sidebarjsToggle: string;

  @HostListener('click', ['$event.target'])
  toggle(element: HTMLSidebarElement): void {
    if (!this.sidebarService.elemHasListener(element)) {
      this.sidebarService.toggle(this.sidebarjsToggle);
    }
  }

  constructor(private sidebarService: SidebarService) {
  }

}
