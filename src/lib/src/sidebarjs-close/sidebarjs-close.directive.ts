import { Directive, HostListener, Input } from '@angular/core';
import { HTMLSidebarElement } from 'sidebarjs';
import { SidebarJSService } from '../sidebarjs.service';

@Directive({
  selector: '[sidebarjsClose]'
})
export class SidebarJSCloseDirective {
  @Input()
  sidebarjsClose: string;

  @HostListener('click', ['$event'])
  close(event: Event): void {
    if (!this.sidebarjsService.elemHasListener(<HTMLSidebarElement>event.target)) {
      this.sidebarjsService.close(this.sidebarjsClose);
    }
  }

  constructor(private sidebarjsService: SidebarJSService) {
  }
}
