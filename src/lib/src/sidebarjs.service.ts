import { Injectable } from '@angular/core';
import * as SidebarJS from 'sidebarjs';
import { SidebarConfig } from 'sidebarjs';

const Core = SidebarJS['default'] || SidebarJS;

@Injectable()
export class SidebarJSService {
  private instances: any;

  constructor() {
    this.instances = {};
  }

  public init(options: SidebarConfig): SidebarJS {
    const name = options.component.getAttribute('sidebarjs');
    this.instances[name] = new Core(options);
    return this.instances[name];
  }

  public open(sidebarName: string = ''): void {
    if (this.instances[sidebarName]) {
      this.instances[sidebarName].open();
    }
  }

  public close(sidebarName: string = ''): void {
    if (this.instances[sidebarName]) {
      this.instances[sidebarName].close();
    }
  }

  public toggle(sidebarName: string = ''): void {
    if (this.instances[sidebarName]) {
      this.instances[sidebarName].toggle();
    }
  }

  public isVisible(sidebarName: string = ''): boolean {
    return !!this.instances[sidebarName] && this.instances[sidebarName].isVisible();
  }

  public setPosition(position: 'left' | 'right', sidebarName: string = ''): void {
    if (this.instances[sidebarName]) {
      this.instances[sidebarName].setPosition(position);
    }
  }

  public elemHasListener(elem: SidebarJS.HTMLSidebarElement, value?: boolean): boolean {
    return Core.elemHasListener(elem, value);
  }

  public destroy(sidebarName: string = ''): void {
    if (this.instances[sidebarName]) {
      delete this.instances[sidebarName];
    }
  }
}
