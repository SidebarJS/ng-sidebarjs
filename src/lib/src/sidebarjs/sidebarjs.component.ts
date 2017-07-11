import { AfterContentInit, Component, ElementRef, Input, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import * as SidebarJS from 'sidebarjs';
import { SidebarConfig } from 'sidebarjs';
import { SidebarJSService } from '../sidebarjs.service';

interface ConfigDomElements {
  component: HTMLElement;
  container: HTMLElement;
  background: HTMLElement;
}

@Component({
  selector: 'sidebar-js',
  templateUrl: './sidebarjs.component.html',
  styleUrls: ['./../../../../node_modules/sidebarjs/dist/sidebarjs.css']
})
export class SidebarJSComponent implements AfterContentInit, OnDestroy {
  @Input() sidebarjsName: string;
  @Input() sidebarjsConfig: SidebarConfig;
  @ViewChild('component') component: ElementRef;
  @ViewChild('container') container: ElementRef;
  @ViewChild('background') background: ElementRef;

  constructor(
    private sidebarService: SidebarJSService,
    private renderer: Renderer2,
  ) {
  }

  ngAfterContentInit() {
    const configDomElements = this.defineConfigDomElements();
    this.setSidebarAttributes(this.sidebarjsName, configDomElements);
    this.sidebarService.init(Object.assign({}, this.sidebarjsConfig, configDomElements));
  }

  ngOnDestroy() {
    this.sidebarService.destroy(this.sidebarjsName);
  }

  private defineConfigDomElements(): ConfigDomElements {
    return {
      component: this.component.nativeElement,
      container: this.container.nativeElement,
      background: this.background.nativeElement,
    };
  }

  private setSidebarAttributes(sidebarName: string = '', configDomElements: ConfigDomElements): void {
    this.renderer.setAttribute(configDomElements.component, 'sidebarjs', sidebarName);
    this.renderer.setAttribute(configDomElements.container, 'sidebarjs-container', '');
    this.renderer.setAttribute(configDomElements.background, 'sidebarjs-background', '');
  }
}
