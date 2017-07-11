import { Component } from '@angular/core';
import { SidebarJSService } from 'ng-sidebarjs';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  sidebarName: string;

  constructor(private sidebarjsService: SidebarJSService) {
    this.sidebarName = 'prova';
  }

  isVisible(name: string) {
    return this.sidebarjsService.isVisible(name);
  }
}
