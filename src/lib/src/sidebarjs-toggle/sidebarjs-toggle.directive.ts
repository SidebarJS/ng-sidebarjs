import { Directive, HostListener, Input } from '@angular/core';
import { HTMLSidebarElement } from 'sidebarjs';
import { SidebarJSService } from '../sidebarjs.service';

@Directive({
  selector: '[sidebarjs-toggle]'
})
export class SidebarJSToggleDirective {
  @Input('sidebarjs-toggle')
  sidebarjsToggle: string;

  @HostListener('click', ['$event'])
  toggle(event: Event) {
    if (!this.sidebarjsService.elemHasListener(<HTMLSidebarElement>event.target)) {
      this.sidebarjsService.toggle(this.sidebarjsToggle);
    }
  }

  constructor(private sidebarjsService: SidebarJSService) {
  }
}
