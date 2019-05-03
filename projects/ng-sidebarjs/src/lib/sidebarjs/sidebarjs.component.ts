import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { SidebarConfig, SidebarService } from 'sidebarjs';

interface ConfigDomElements {
  component: HTMLElement;
  container: HTMLElement;
  backdrop: HTMLElement;
}

@Component({
  selector: 'ng-sidebarjs',
  templateUrl: './sidebarjs.component.html',
  styleUrls: [
    './../../../../../node_modules/sidebarjs/src/sidebarjs.scss',
    './sidebarjs.component.css',
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarjsComponent implements AfterContentInit, OnDestroy {
  @Input() sidebarjsName = '';
  @Input() sidebarjsConfig: SidebarConfig;
  @Output() open: EventEmitter<void> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() changeVisibility: EventEmitter<{ isVisible: boolean }> = new EventEmitter();
  @ViewChild('container') container: ElementRef;
  @ViewChild('backdrop') backdrop: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private sidebarService: SidebarService,
    private renderer: Renderer2,
  ) {
  }

  ngAfterContentInit() {
    const userConfig = this.sidebarjsConfig;
    const baseConfig = this.defineConfigDomElements();
    this.renderer.setAttribute(baseConfig.component, 'sidebarjs', this.sidebarjsName);
    this.renderer.setAttribute(baseConfig.container, 'sidebarjs-container', '');
    this.renderer.setAttribute(baseConfig.backdrop, 'sidebarjs-backdrop', '');
    this.sidebarService.create({
      ...userConfig,
      ...baseConfig,
      onOpen: () => this.open.emit(),
      onClose: () => this.close.emit(),
      onChangeVisibility: (changes) => this.changeVisibility.emit(changes),
    });
  }

  ngOnDestroy() {
    this.sidebarService.destroy(this.sidebarjsName);
  }

  private defineConfigDomElements(): ConfigDomElements {
    return {
      component: this.elementRef.nativeElement,
      container: this.container.nativeElement,
      backdrop: this.backdrop.nativeElement,
    };
  }
}
