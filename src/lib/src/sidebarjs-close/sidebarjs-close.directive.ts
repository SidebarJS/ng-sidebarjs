import { Directive, HostListener, Input } from '@angular/core';
import { HTMLSidebarElement } from 'sidebarjs';
import { SidebarJSService } from '../sidebarjs.service';

@Directive({
  selector: '[sidebarjsClose]'
})
export class SidebarJSCloseDirective {
  @Input()
  sidebarjsClose: string;

  @HostListener('click', ['$event.target'])
  close(element: HTMLSidebarElement): void {
    if (!this.sidebarService.elemHasListener(element)) {
      this.sidebarService.close(this.sidebarjsClose);
    }
  }

  constructor(private sidebarService: SidebarJSService) {
  }
}
