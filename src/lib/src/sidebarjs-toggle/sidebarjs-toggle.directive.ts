import { Directive, HostListener, Input } from '@angular/core';
import { HTMLSidebarElement } from 'sidebarjs';
import { SidebarJSService } from '../sidebarjs.service';

@Directive({
  selector: '[sidebarjsToggle]'
})
export class SidebarJSToggleDirective {
  @Input()
  sidebarjsToggle: string;

  @HostListener('click', ['$event'])
  toggle(event: Event): void {
    if (!this.sidebarjsService.elemHasListener(<HTMLSidebarElement>event.target)) {
      this.sidebarjsService.toggle(this.sidebarjsToggle);
    }
  }

  constructor(private sidebarjsService: SidebarJSService) {
  }
}
