import { Component } from '@angular/core';
import { SidebarConfig, SidebarjsService } from 'ng-sidebarjs';
import { SidebarPosition } from 'sidebarjs';

@Component({
  selector: 'example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public sidebarConfig: SidebarConfig = {
    nativeSwipe: true,
    position: SidebarPosition.Right,
  };

  constructor(
    public readonly sidebarjsService: SidebarjsService
  ) {
    console.log(this.sidebarjsService);
  }

  onEvent(e: any) {
    console.log(e);
  }
}
