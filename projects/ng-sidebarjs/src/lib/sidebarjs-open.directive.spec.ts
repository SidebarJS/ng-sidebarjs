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
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, SidebarjsOpenDirective],
      providers: [{provide: SidebarjsService, useFactory: () => SidebarjsMock}]
    })
    .compileComponents()
    .catch(console.log);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(By.directive(SidebarjsOpenDirective));
  });

  it('should have 2 elements with directive', () => {
    expect(elementsWithDirective.length).toBe(2);
  });

  it('should open sidebar', () => {
    // todo
    console.log(elementsWithDirective[0].nativeElement.dispatchEvent(new Event('click')));
    console.log(elementsWithDirective[1].nativeElement.dispatchEvent(new Event('click')));
  });
});
