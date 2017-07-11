import {
  AfterContentChecked, AfterContentInit, Component, ElementRef, Input, Renderer2,
  ViewChild
} from '@angular/core';
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

  constructor(
    private sidebarService: SidebarJSService,
    private renderer: Renderer2,
  ) {
  }

  ngAfterContentInit() {
    const component = this.component.nativeElement;
    const container = this.container.nativeElement;
    const background = this.background.nativeElement;
    this.renderer.setAttribute(component, 'sidebarjs', this.sidebarjsName);
    this.renderer.setAttribute(container, 'sidebarjs-container', '');
    this.renderer.setAttribute(background, 'sidebarjs-background', '');
    this.sidebar = this.sidebarService.init({component, container, background});
    // console.log(this.sidebar);
  }
}
