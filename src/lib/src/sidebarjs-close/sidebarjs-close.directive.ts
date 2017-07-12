import { Directive, HostListener, Input } from '@angular/core';
import { HTMLSidebarElement } from 'sidebarjs';
import { SidebarJSService } from '../sidebarjs.service';

@Directive({
  selector: '[sidebarjs-close]'
})
export class SidebarJSCloseDirective {
  @Input('sidebarjs-close')
  sidebarjsClose: string;

  @HostListener('click', ['$event'])
  close(event: Event) {
    if (!this.sidebarjsService.elemHasListener(<HTMLSidebarElement>event.target)) {
      this.sidebarjsService.close(this.sidebarjsClose);
    }
  }

  constructor(private sidebarjsService: SidebarJSService) {
  }
}
