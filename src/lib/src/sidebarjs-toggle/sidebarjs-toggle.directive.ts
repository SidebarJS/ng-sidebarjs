import { Directive, HostListener, Input } from '@angular/core';
import { SidebarJSService } from '../sidebarjs.service';

@Directive({
  selector: '[sidebarjsToggle]'
})
export class SidebarJSToggleDirective {
  @Input() sidebarjsToggle: string;

  @HostListener('click') toggle() {
    this.sidebarjsService.toggle(this.sidebarjsToggle);
  }

  constructor(private sidebarjsService: SidebarJSService) {
  }
}
