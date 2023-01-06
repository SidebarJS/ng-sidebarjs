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
import { SidebarjsService, SidebarConfig } from '../sidebarjs.service';

@Component({
  selector: 'sidebarjs-element',
  templateUrl: './sidebarjs-element.component.html',
  styleUrls: [
    './../../../../../node_modules/sidebarjs/src/sidebarjs.scss',
    './sidebarjs-element.component.css',
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarjsElementComponent implements AfterContentInit, OnDestroy {

  @Input() sidebarjsName = '';
  @Input() sidebarjsConfig: SidebarConfig = {};

  // tslint:disable-next-line:no-output-native
  @Output() open: EventEmitter<void> = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() changeVisibility: EventEmitter<{ isVisible: boolean }> = new EventEmitter();

  @ViewChild('container') container?: ElementRef<HTMLElement>;
  @ViewChild('backdrop') backdrop?: ElementRef<HTMLElement>;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly sidebarjsService: SidebarjsService,
    private readonly renderer: Renderer2,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.changeDetectorRef.detach();
  }

  ngAfterContentInit(): void {
    const baseConfig = this.defineConfigDomElements();
    this.renderer.setAttribute(baseConfig.component, 'sidebarjs', this.sidebarjsName);
    if (baseConfig.container) {
      this.renderer.setAttribute(baseConfig.container, 'sidebarjs-container', '');
    }
    if (baseConfig.backdrop) {
      this.renderer.setAttribute(baseConfig.backdrop, 'sidebarjs-backdrop', '');
    }
    this.sidebarjsService.create({
      ...this.sidebarjsConfig,
      ...baseConfig,
      onOpen: () => this.open.emit(),
      onClose: () => this.close.emit(),
      onChangeVisibility: (changes) => this.changeVisibility.emit(changes),
    });
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.sidebarjsService.destroy(this.sidebarjsName);
  }

  private defineConfigDomElements(): {
    component: HTMLElement
    container: HTMLElement | undefined
    backdrop: HTMLElement | undefined
  } {
    return {
      component: this.elementRef.nativeElement,
      container: this.container && this.container.nativeElement ? this.container.nativeElement : undefined,
      backdrop: this.backdrop && this.backdrop.nativeElement ? this.backdrop.nativeElement : undefined,
    };
  }
}
