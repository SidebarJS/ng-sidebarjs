import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HTMLSidebarElement } from 'sidebarjs';
import { SidebarJSOpenDirective } from './sidebarjs-open.directive';
import { SidebarJSService } from './../sidebarjs.service';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'test-component',
  template: `
    <button sidebarjsOpen></button>`
})
class TestComponent {
}

class SidebarServiceStub {
  elemHasListener(elem: HTMLSidebarElement, value?: boolean): boolean {
    return !!elem.sidebarjsListener;
  }

  open(sidebarName: string): void {
    console.log('opened');
  }
}

describe('SidebarJSOpenDirective', () => {
  let el: DebugElement;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [TestComponent, SidebarJSOpenDirective],
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
    const directive = new SidebarJSOpenDirective(new SidebarServiceStub() as SidebarJSService);
    expect(directive).toBeTruthy();
  });

  it('should trigger action', () => {
    const directive = new SidebarJSOpenDirective(new SidebarServiceStub() as SidebarJSService);
    const base = el.query(By.directive(SidebarJSOpenDirective));
    const element = base.nativeElement;
    spyOn(directive['__proto__'], 'open');
    base.triggerEventHandler('click', {target: element});
    expect(directive['__proto__'].open).toHaveBeenCalledWith(element);
  });

  it('should call service action', () => {
    const directive = new SidebarJSOpenDirective(new SidebarServiceStub() as SidebarJSService);
    const base = el.query(By.directive(SidebarJSOpenDirective));
    const element = base.nativeElement;
    spyOn(directive['sidebarService']['__proto__'], 'elemHasListener').and.callThrough();
    spyOn(directive['sidebarService']['__proto__'], 'open').and.callThrough();
    base.triggerEventHandler('click', {target: element});
    expect(directive['sidebarService']['__proto__']['elemHasListener']).toHaveBeenCalled();
    expect(directive['sidebarService']['__proto__']['open']).toHaveBeenCalledWith(directive.sidebarjsOpen);
  });
});
