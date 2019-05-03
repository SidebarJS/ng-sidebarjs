import { Component } from '@angular/core';
import { SidebarService } from "ng-sidebarjs";
import { SidebarConfig } from 'sidebarjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public sidebarConfig: SidebarConfig = {nativeSwipe: false};

  constructor(
    public readonly sidebarService: SidebarService
  ) {
    console.log(this.sidebarService);
  }

  onEvent(e) {
    console.log(e);
  }
}
