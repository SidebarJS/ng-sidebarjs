import { Component } from '@angular/core';
import { SidebarJSService } from 'ng-sidebarjs';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private sidebarjsService: SidebarJSService) {
  }

  public isVisible(name: string) {
    return this.sidebarjsService.isVisible(name);
  }
}
