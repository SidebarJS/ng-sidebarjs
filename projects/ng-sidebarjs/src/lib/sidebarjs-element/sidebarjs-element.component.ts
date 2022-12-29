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
  styleUrls: ['./sidebarjs-element.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarjsElementComponent implements AfterContentInit, OnDestroy {

  @Input() sidebarjsName = '';
  @Input() sidebarjsConfig: SidebarConfig = {};

  @Output() open: EventEmitter<void> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();
  @Output() changeVisibility: EventEmitter<{ isVisible: boolean }> = new EventEmitter();

  @ViewChild('container', {static: true}) container?: ElementRef<HTMLElement>;
  @ViewChild('backdrop', {static: true}) backdrop?: ElementRef<HTMLElement>;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly sidebarjsService: SidebarjsService,
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
    this.sidebarjsService.create({
      ...this.sidebarjsConfig,
      ...baseConfig,
      onOpen: () => this.open.emit(),
      onClose: () => this.close.emit(),
      onChangeVisibility: (changes) => this.changeVisibility.emit(changes),
    });
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.sidebarjsService.destroy(this.sidebarjsName);
  }

  private defineConfigDomElements() {
    return {
      component: this.elementRef.nativeElement,
      container: this.container?.nativeElement,
      backdrop: this.backdrop?.nativeElement,
    };
  }
}
