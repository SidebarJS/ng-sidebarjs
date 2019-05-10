import { Component, DebugElement, OnDestroy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarjsToggleDirective } from './sidebarjs-toggle.directive';
import { SidebarjsService } from './sidebarjs.service';
import { SidebarjsMock } from './sidebarjs.service.spec';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: '<button sidebarjsToggle></button><button sidebarjsToggle="fooSidebar"></button>',
})
class TestComponent {
}

describe('SidebarjsToggle', () => {
  let service: SidebarjsService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: DebugElement[];
  let spyToggle: jasmine.Spy;
  let spyElemHasListener: jasmine.Spy;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, SidebarjsToggleDirective],
      providers: [{provide: SidebarjsService, useFactory: () => SidebarjsMock}]
    })
    .compileComponents()
    .catch(console.log);
  });

  beforeEach(() => {
    service = TestBed.get(SidebarjsService);
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(By.directive(SidebarjsToggleDirective));
    spyToggle = spyOn(service, 'toggle');
    spyElemHasListener = spyOn(service, 'elemHasListener').and.returnValue(false);
  });

  it('should have 2 elements with directive', () => {
    expect(elementsWithDirective.length).toBe(2);
  });

  it('should toggle sidebar', () => {
    elementsWithDirective[0].nativeElement.dispatchEvent(new Event('click'));
    elementsWithDirective[1].nativeElement.dispatchEvent(new Event('click'));
    expect(spyToggle).toHaveBeenCalledTimes(2);
    expect(spyToggle.calls.allArgs()).toEqual([[''], ['fooSidebar']]);
    expect(spyElemHasListener).toHaveBeenCalledTimes(2);
  });

  it('should not invoke service.toggle if element has native listener', () => {
    spyElemHasListener.and.returnValue(true);
    elementsWithDirective[0].nativeElement.dispatchEvent(new Event('click'));
    elementsWithDirective[1].nativeElement.dispatchEvent(new Event('click'));
    expect(spyToggle).toHaveBeenCalledTimes(0);
    expect(spyElemHasListener).toHaveBeenCalledTimes(2);
  });

  it('should destroy listener', () => {
    fixture.destroy();
    elementsWithDirective[0].nativeElement.dispatchEvent(new Event('click'));
    elementsWithDirective[1].nativeElement.dispatchEvent(new Event('click'));
    expect(spyToggle).toHaveBeenCalledTimes(0);
    expect(spyElemHasListener).toHaveBeenCalledTimes(0);
  });
});
