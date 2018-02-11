import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarJSComponent } from './sidebarjs.component';
import { SidebarJSService } from '../sidebarjs.service';
import { SidebarConfig } from 'sidebarjs';

class SidebarServiceStub {
  create(sidebarConfig: SidebarConfig) {
  }

  destroy(sidebarName: string) {
  }
}

describe('SidebarJSComponent', () => {
  let component: SidebarJSComponent;
  let fixture: ComponentFixture<SidebarJSComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [SidebarJSComponent],
        providers: [{provide: SidebarJSService, useClass: SidebarServiceStub}]
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SidebarJSComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should invoke defineConfigDomElements', () => {
    spyOn<any>(component, 'defineConfigDomElements').and.callThrough();
    component.ngAfterContentInit();
    expect(component['defineConfigDomElements']).toHaveBeenCalled();
  });

  it('should define baseConfigDomElements', () => {
    const baseConfigDomElements = component['defineConfigDomElements']();
    expect(baseConfigDomElements).toBeDefined();
    expect(baseConfigDomElements.component).toBeDefined();
    expect(baseConfigDomElements.component).toBe(component.component.nativeElement);
    expect(baseConfigDomElements.container).toBeDefined();
    expect(baseConfigDomElements.container).toBe(component.container.nativeElement);
    expect(baseConfigDomElements.backdrop).toBeDefined();
    expect(baseConfigDomElements.backdrop).toBe(component.backdrop.nativeElement);
  });

  it('should invoke setSidebarAttributes', () => {
    spyOn<any>(component, 'setSidebarAttributes').and.callThrough();
    component.ngAfterContentInit();
    expect(component['setSidebarAttributes']).toHaveBeenCalled();
  });

  it('should set sidebar core attributes', () => {
    component['setSidebarAttributes'](component.sidebarjsName, {
      component: component.component.nativeElement,
      container: component.container.nativeElement,
      backdrop: component.backdrop.nativeElement
    });
    expect(component.component.nativeElement.attributes['sidebarjs']).toBeDefined();
    expect(component.container.nativeElement.attributes['sidebarjs-container']).toBeDefined();
    expect(component.backdrop.nativeElement.attributes['sidebarjs-backdrop']).toBeDefined();
  });

  it('should set sidebar core attributes with custom name', () => {
    component.sidebarjsName = 'myCustomName';
    component['setSidebarAttributes'](component.sidebarjsName, {
      component: component.component.nativeElement,
      container: component.container.nativeElement,
      backdrop: component.backdrop.nativeElement
    });
    expect(component.component.nativeElement.attributes['sidebarjs']).toBeDefined();
    expect(component.component.nativeElement.attributes['sidebarjs'].value).toBe(component.sidebarjsName);
    expect(component.container.nativeElement.attributes['sidebarjs-container']).toBeDefined();
    expect(component.backdrop.nativeElement.attributes['sidebarjs-backdrop']).toBeDefined();
  });

  it('should invoke sidebarService.create', () => {
    spyOn(component['sidebarService'], 'create').and.callThrough();
    component.ngAfterContentInit();
    expect(component['sidebarService']['create']).toHaveBeenCalledTimes(1);
  });

  it('should invoke sidebarService.destroy', () => {
    spyOn(component['sidebarService'], 'destroy').and.callThrough();
    component.ngOnDestroy();
    expect(component['sidebarService']['destroy']).toHaveBeenCalledWith(component.sidebarjsName);
  });
});
