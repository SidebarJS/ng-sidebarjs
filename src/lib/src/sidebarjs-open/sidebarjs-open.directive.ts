import { Directive, HostListener, Input } from '@angular/core';
import { HTMLSidebarElement } from 'sidebarjs';
import { SidebarJSService } from '../sidebarjs.service';

@Directive({
  selector: '[sidebarjsOpen]'
})
export class SidebarJSOpenDirective {
  @Input()
  sidebarjsOpen: string;

  @HostListener('click', ['$event'])
  open(event: Event): void {
    if (!this.sidebarjsService.elemHasListener(<HTMLSidebarElement>event.target)) {
      this.sidebarjsService.open(this.sidebarjsOpen);
    }
  }

  constructor(private sidebarjsService: SidebarJSService) {
  }
}
