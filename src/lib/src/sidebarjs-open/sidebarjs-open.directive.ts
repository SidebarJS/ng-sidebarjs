import { Directive, HostListener, Input } from '@angular/core';
import { HTMLSidebarElement } from 'sidebarjs';
import { SidebarJSService } from '../sidebarjs.service';

@Directive({
  selector: '[sidebarjs-open]'
})
export class SidebarJSOpenDirective {
  @Input('sidebarjs-open')
  sidebarjsOpen: string;

  @HostListener('click', ['$event'])
  open(event: Event) {
    if (!this.sidebarjsService.elemHasListener(<HTMLSidebarElement>event.target)) {
      this.sidebarjsService.open(this.sidebarjsOpen);
    }
  }

  constructor(private sidebarjsService: SidebarJSService) {
  }
}
