import { Directive, HostListener, Input } from '@angular/core';
import { SidebarJSService } from '../sidebarjs.service';

@Directive({
  selector: '[sidebarjsOpen]'
})
export class SidebarJSOpenDirective {
  @Input() sidebarjsOpen: string;

  @HostListener('click') open() {
    this.sidebarjsService.open(this.sidebarjsOpen);
  }

  constructor(private sidebarjsService: SidebarJSService) {
  }
}
