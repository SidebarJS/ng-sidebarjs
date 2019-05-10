import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarjsOpenDirective } from './sidebarjs-open.directive';
import { SidebarjsService } from './sidebarjs.service';
import { SidebarjsMock } from './sidebarjs.service.spec';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: '<button sidebarjsOpen></button><button sidebarjsOpen="fooSidebar"></button>',
})
class TestComponent {
}

describe('SidebarjsOpen', () => {
  let service: SidebarjsService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: DebugElement[];
  let spyOpen: jasmine.Spy;
  let spyElemHasListener: jasmine.Spy;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, SidebarjsOpenDirective],
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
    elementsWithDirective = fixture.debugElement.queryAll(By.directive(SidebarjsOpenDirective));
    spyOpen = spyOn(service, 'open');
    spyElemHasListener = spyOn(service, 'elemHasListener').and.returnValue(false);
  });

  it('should have 2 elements with directive', () => {
    expect(elementsWithDirective.length).toBe(2);
  });

  it('should open sidebar', () => {
    elementsWithDirective[0].nativeElement.dispatchEvent(new Event('click'));
    elementsWithDirective[1].nativeElement.dispatchEvent(new Event('click'));
    expect(spyOpen).toHaveBeenCalledTimes(2);
    expect(spyOpen.calls.allArgs()).toEqual([[''], ['fooSidebar']]);
    expect(spyElemHasListener).toHaveBeenCalledTimes(2);
  });

  it('should not invoke service.open if element has native listener', () => {
    spyElemHasListener.and.returnValue(true);
    elementsWithDirective[0].nativeElement.dispatchEvent(new Event('click'));
    elementsWithDirective[1].nativeElement.dispatchEvent(new Event('click'));
    expect(spyOpen).toHaveBeenCalledTimes(0);
    expect(spyElemHasListener).toHaveBeenCalledTimes(2);
  });

  it('should destroy listener', () => {
    fixture.destroy();
    elementsWithDirective[0].nativeElement.dispatchEvent(new Event('click'));
    elementsWithDirective[1].nativeElement.dispatchEvent(new Event('click'));
    expect(spyOpen).toHaveBeenCalledTimes(0);
    expect(spyElemHasListener).toHaveBeenCalledTimes(0);
  });
});
