import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as SidebarJS from 'sidebarjs';

@Component({
  selector: 'sidebar-js',
  templateUrl: './sidebar-js.component.html',
  styleUrls: ['./../../../../node_modules/sidebarjs/dist/sidebarjs.css']
})
export class SidebarJSComponent implements AfterContentInit {
  @ViewChild('component') component: ElementRef;
  @ViewChild('container') container: ElementRef;
  @ViewChild('background') background: ElementRef;

  sidebar: SidebarJS;

  ngAfterContentInit() {
    this.sidebar = new SidebarJS({
      component: this.component.nativeElement,
      container: this.container.nativeElement,
      background: this.background.nativeElement,
    });
  }
}
