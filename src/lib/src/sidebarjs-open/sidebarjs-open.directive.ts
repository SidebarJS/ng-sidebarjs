import { Directive, HostListener, Input } from '@angular/core';
import { HTMLSidebarElement } from 'sidebarjs';
import { SidebarJSService } from '../sidebarjs.service';

@Directive({
  selector: '[sidebarjsOpen]'
})
export class SidebarJSOpenDirective {
  @Input()
  sidebarjsOpen: string;

  @HostListener('click', ['$event.target'])
  open(element: HTMLSidebarElement): void {
    if (!this.sidebarService.elemHasListener(element)) {
      this.sidebarService.open(this.sidebarjsOpen);
    }
  }

  constructor(private sidebarService: SidebarJSService) {
  }
}
