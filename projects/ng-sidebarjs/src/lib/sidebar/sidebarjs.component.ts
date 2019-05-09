import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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

@Component({
  selector: 'sidebarjs',
  templateUrl: './sidebarjs.component.html',
  styleUrls: [
    './../../../../../node_modules/sidebarjs/src/sidebarjs.scss',
    './sidebarjs.component.css',
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements AfterContentInit, OnDestroy {

  @Input() sidebarjsName = '';
  @Input() sidebarjsConfig: SidebarConfig = {};

  @Output() open: EventEmitter<void> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() changeVisibility: EventEmitter<{ isVisible: boolean }> = new EventEmitter();

  @ViewChild('container') container: ElementRef<HTMLElement>;
  @ViewChild('backdrop') backdrop: ElementRef<HTMLElement>;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly sidebarService: SidebarService,
    private readonly renderer: Renderer2,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.changeDetectorRef.detach();
  }

  ngAfterContentInit() {
    const baseConfig = this.defineConfigDomElements();
    this.renderer.setAttribute(baseConfig.component, 'sidebarjs', this.sidebarjsName);
    this.renderer.setAttribute(baseConfig.container, 'sidebarjs-container', '');
    this.renderer.setAttribute(baseConfig.backdrop, 'sidebarjs-backdrop', '');
    this.sidebarService.create({
      ...this.sidebarjsConfig,
      ...baseConfig,
      onOpen: () => this.open.emit(),
      onClose: () => this.close.emit(),
      onChangeVisibility: (changes) => this.changeVisibility.emit(changes),
    });
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.sidebarService.destroy(this.sidebarjsName);
  }

  private defineConfigDomElements() {
    return {
      component: this.elementRef.nativeElement,
      container: this.container.nativeElement,
      backdrop: this.backdrop.nativeElement,
    };
  }
}
