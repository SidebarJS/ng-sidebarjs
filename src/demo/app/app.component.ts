import { Component } from '@angular/core';
import { SidebarJSService } from 'ng-sidebarjs';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentTarget: {className: string, name: string, link: string};

  constructor(
    private sidebarjsService: SidebarJSService
  ) {}

  public isVisible(name: string): boolean {
    return this.sidebarjsService.isVisible(name);
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
