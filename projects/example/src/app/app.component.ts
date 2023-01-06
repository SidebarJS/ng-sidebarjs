import { Component } from '@angular/core';
import { SidebarjsService } from 'ng-sidebarjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    // @Inject(SidebarJSService)
    private readonly sidebarjsService: SidebarjsService
  ) {
    console.log(this.sidebarjsService);
  }

  public onOpen() {
    console.log('open');
  }

  public onClose() {
    console.log('close');
  }

  public onChangeVisibility(event: any) {
    console.log('change visibility', event);
  }
}
