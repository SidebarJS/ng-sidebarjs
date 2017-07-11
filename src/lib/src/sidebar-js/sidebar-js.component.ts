import { AfterContentInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as SidebarJS from 'sidebarjs';
import { SidebarJSService } from '../sidebarjs.service';

@Component({
  selector: 'sidebar-js',
  templateUrl: './sidebar-js.component.html',
  styleUrls: ['./../../../../node_modules/sidebarjs/dist/sidebarjs.css']
})
export class SidebarJSComponent implements AfterContentInit {
  @Input() sidebarjsName: string;
  @ViewChild('component') component: ElementRef;
  @ViewChild('container') container: ElementRef;
  @ViewChild('background') background: ElementRef;

  sidebar: SidebarJS;

  constructor(private sidebarService: SidebarJSService) {
  }

  ngAfterContentInit() {
    this.sidebar = this.sidebarService.init({
      component: this.component.nativeElement,
      container: this.container.nativeElement,
      background: this.background.nativeElement,
    });
  }
}
