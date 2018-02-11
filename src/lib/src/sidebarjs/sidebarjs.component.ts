import {
  AfterContentInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2,
  ViewChild
} from '@angular/core';
import { SidebarConfig } from 'sidebarjs';
import { SidebarJSService } from '../sidebarjs.service';

interface ConfigDomElements {
  component: HTMLElement;
  container: HTMLElement;
  backdrop: HTMLElement;
}

@Component({
  selector: 'sidebar-js',
  templateUrl: './sidebarjs.component.html',
  styleUrls: ['./../../../../node_modules/sidebarjs/dist/sidebarjs.css']
})
export class SidebarJSComponent implements AfterContentInit, OnDestroy {
  @Input() sidebarjsName: string;
  @Input() sidebarjsConfig: SidebarConfig;
  @Output() open: EventEmitter<void> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() changeVisibility: EventEmitter<{isVisible: boolean}> = new EventEmitter();
  @ViewChild('component') component: ElementRef;
  @ViewChild('container') container: ElementRef;
  @ViewChild('backdrop') backdrop: ElementRef;

  constructor(
    private sidebarService: SidebarJSService,
    private renderer: Renderer2,
  ) {
  }

  ngAfterContentInit() {
    const userConfig = this.sidebarjsConfig;
    const baseConfig = this.defineConfigDomElements();
    this.setSidebarAttributes(this.sidebarjsName, baseConfig);
    this.sidebarService.create({
      ...userConfig,
      ...baseConfig,
      onOpen: () => {
        this.open.emit();
      },
      onClose: () => {
        this.close.emit();
      },
      onChangeVisibility: (changes) => {
        this.changeVisibility.emit(changes);
      },
    });
  }

  ngOnDestroy() {
    this.sidebarService.destroy(this.sidebarjsName);
  }

  private defineConfigDomElements(): ConfigDomElements {
    return {
      component: this.component.nativeElement,
      container: this.container.nativeElement,
      backdrop: this.backdrop.nativeElement,
    };
  }

  private setSidebarAttributes(sidebarName: string = '', baseConfig: ConfigDomElements): void {
    this.renderer.setAttribute(baseConfig.component, 'sidebarjs', sidebarName);
    this.renderer.setAttribute(baseConfig.container, 'sidebarjs-container', '');
    this.renderer.setAttribute(baseConfig.backdrop, 'sidebarjs-backdrop', '');
  }
}
