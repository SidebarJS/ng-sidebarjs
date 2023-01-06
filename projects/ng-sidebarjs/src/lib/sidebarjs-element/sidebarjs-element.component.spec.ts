import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarjsElementComponent } from './sidebarjs-element.component';
import { SidebarjsService } from '../sidebarjs.service';
import { SidebarjsMock } from '../sidebarjs.service.spec';
import { Component } from '@angular/core';
import { SidebarConfig } from 'sidebarjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'test-component',
  template: '<sidebarjs>foo</sidebarjs>',
})
class TestComponent {
}

describe('SidebarjsElement', () => {
  let service: SidebarjsService;
  let component: SidebarjsElementComponent;
  let fixture: ComponentFixture<SidebarjsElementComponent>;
  let nativeElement: HTMLElement;
  let spyCreate: jasmine.Spy;
  let spyDestroy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarjsElementComponent],
      providers: [{provide: SidebarjsService, useFactory: () => SidebarjsMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(SidebarjsService);
    fixture = TestBed.createComponent(SidebarjsElementComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
    spyCreate = spyOn(service, 'create');
    spyDestroy = spyOn(service, 'destroy');
  });

  it('should create sidebarjs', () => {
    component.ngAfterContentInit();
    const container = nativeElement.children[0] as HTMLElement;
    const backdrop = nativeElement.children[1] as HTMLElement;
    expect(nativeElement.hasAttribute('sidebarjs')).toBeTruthy();
    expect(container.hasAttribute('sidebarjs-container')).toBeTruthy();
    expect(backdrop.hasAttribute('sidebarjs-backdrop')).toBeTruthy();
    expect(spyCreate).toHaveBeenCalledTimes(1);
    const configArgs: Partial<SidebarConfig> = spyCreate.calls.allArgs()[0][0];
    const configExpected: Partial<SidebarConfig> = {component: nativeElement, container, backdrop};
    expect(configArgs).toEqual(jasmine.objectContaining(configExpected));
    expect(configArgs.onClose).toBeDefined();
    expect(configArgs.onOpen).toBeDefined();
    expect(configArgs.onChangeVisibility).toBeDefined();
  });

  it('should destroy sidebarjs', () => {
    fixture.destroy();
    expect(spyDestroy).toHaveBeenCalledTimes(1);
  });
});
