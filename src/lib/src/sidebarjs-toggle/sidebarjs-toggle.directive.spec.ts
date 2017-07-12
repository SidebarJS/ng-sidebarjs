import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HTMLSidebarElement } from 'sidebarjs';
import { SidebarJSToggleDirective } from './sidebarjs-toggle.directive';
import { SidebarJSService } from './../sidebarjs.service';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: `
    <button sidebarjsToggle></button>`
})
class TestComponent {
}

class SidebarServiceStub {
  elemHasListener(elem: HTMLSidebarElement, value?: boolean): boolean {
    return !!elem.sidebarjsListener;
  }

  toggle(sidebarName: string): void {
    console.log('toggled');
  }
}

describe('SidebarJSToggleDirective', () => {
  let el: DebugElement;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [TestComponent, SidebarJSToggleDirective],
        providers: [{provide: SidebarJSService, useClass: SidebarServiceStub}]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create an instance', () => {
    const directive = new SidebarJSToggleDirective(new SidebarServiceStub() as SidebarJSService);
    expect(directive).toBeTruthy();
  });

  it('should trigger action', () => {
    const directive = new SidebarJSToggleDirective(new SidebarServiceStub() as SidebarJSService);
    const base = el.query(By.directive(SidebarJSToggleDirective));
    const element = base.nativeElement;
    spyOn(directive['__proto__'], 'toggle');
    base.triggerEventHandler('click', {target: element});
    expect(directive['__proto__'].toggle).toHaveBeenCalledWith(element);
  });

  it('should call service action', () => {
    const directive = new SidebarJSToggleDirective(new SidebarServiceStub() as SidebarJSService);
    const base = el.query(By.directive(SidebarJSToggleDirective));
    const element = base.nativeElement;
    spyOn(directive['sidebarService']['__proto__'], 'elemHasListener').and.callThrough();
    spyOn(directive['sidebarService']['__proto__'], 'toggle').and.callThrough();
    base.triggerEventHandler('click', {target: element});
    expect(directive['sidebarService']['__proto__']['elemHasListener']).toHaveBeenCalled();
    expect(directive['sidebarService']['__proto__']['toggle']).toHaveBeenCalledWith(directive.sidebarjsToggle);
  });
});
