import { Component } from '@angular/core';
import { SidebarjsService, SidebarConfig } from 'ng-sidebarjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public sidebarConfig: SidebarConfig = {nativeSwipe: false};

  constructor(
    public readonly sidebarjsService: SidebarjsService
  ) {
    console.log(this.sidebarjsService);
  }

  onEvent(e) {
    console.log(e);
  }
}
