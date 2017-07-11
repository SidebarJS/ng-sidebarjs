import { Directive, HostListener, Input } from '@angular/core';
import { SidebarJSService } from '../sidebarjs.service';

@Directive({
  selector: '[sidebarjsClose]'
})
export class SidebarJSCloseDirective {
  @Input() sidebarjsClose: string;

  @HostListener('click') close() {
    this.sidebarjsService.close(this.sidebarjsClose);
  }

  constructor(private sidebarjsService: SidebarJSService) {
  }
}
