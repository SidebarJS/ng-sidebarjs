import { Component } from '@angular/core';
import { SidebarJSService } from 'ng-sidebarjs';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentTarget: { className: string, name: string, link: string };

  constructor(
    private sidebarjsService: SidebarJSService
  ) {
  }

  public isVisible(name: string): boolean {
    return this.sidebarjsService.isVisible(name);
  }

  public onSidebarOpen() {
    console.log('is open');
  }

  public onSidebarClose() {
    console.log('is close');
  }

  public onChangeSidebarVisibility(event: {isVisible: boolean}) {
    console.log(event);
  }

  public handleElement(event: Event, sidebarName?: string): void {
    const {innerText, href} = event.target as HTMLLinkElement;
    event.preventDefault();
    this.currentTarget = {
      className: innerText.toLowerCase(),
      name: innerText,
      link: href,
    };
    this.sidebarjsService.close(sidebarName);
  }
}
