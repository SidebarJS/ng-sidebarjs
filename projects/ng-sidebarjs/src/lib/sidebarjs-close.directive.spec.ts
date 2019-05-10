import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarjsCloseDirective } from './sidebarjs-close.directive';
import { SidebarjsService } from './sidebarjs.service';
import { SidebarjsMock } from './sidebarjs.service.spec';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: '<button sidebarjsClose></button><button sidebarjsClose="fooSidebar"></button>',
})
class TestComponent {
}

describe('SidebarjsClose', () => {
  let service: SidebarjsService;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: DebugElement[];
  let spyClose: jasmine.Spy;
  let spyElemHasListener: jasmine.Spy;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, SidebarjsCloseDirective],
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
    elementsWithDirective = fixture.debugElement.queryAll(By.directive(SidebarjsCloseDirective));
    spyClose = spyOn(service, 'close');
    spyElemHasListener = spyOn(service, 'elemHasListener').and.returnValue(false);
  });

  it('should have 2 elements with directive', () => {
    expect(elementsWithDirective.length).toBe(2);
  });

  it('should close sidebar', () => {
    elementsWithDirective[0].nativeElement.dispatchEvent(new Event('click'));
    elementsWithDirective[1].nativeElement.dispatchEvent(new Event('click'));
    expect(spyClose).toHaveBeenCalledTimes(2);
    expect(spyClose.calls.allArgs()).toEqual([[''], ['fooSidebar']]);
    expect(spyElemHasListener).toHaveBeenCalledTimes(2);
  });

  it('should not invoke service.close if element has native listener', () => {
    spyElemHasListener.and.returnValue(true);
    elementsWithDirective[0].nativeElement.dispatchEvent(new Event('click'));
    elementsWithDirective[1].nativeElement.dispatchEvent(new Event('click'));
    expect(spyClose).toHaveBeenCalledTimes(0);
    expect(spyElemHasListener).toHaveBeenCalledTimes(2);
  });

  it('should destroy listener', () => {
    fixture.destroy();
    elementsWithDirective[0].nativeElement.dispatchEvent(new Event('click'));
    elementsWithDirective[1].nativeElement.dispatchEvent(new Event('click'));
    expect(spyClose).toHaveBeenCalledTimes(0);
    expect(spyElemHasListener).toHaveBeenCalledTimes(0);
  });
});
