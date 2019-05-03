import { Component } from '@angular/core';
import { SidebarService } from "ng-sidebarjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public readonly sidebarService: SidebarService
  ) {

    console.log(sidebarService);
  }
}
