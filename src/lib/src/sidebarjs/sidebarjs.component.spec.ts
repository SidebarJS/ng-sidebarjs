import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SidebarJSComponent } from './sidebarjs.component';

describe('SidebarJSComponent', function () {
  let de: DebugElement;
  let comp: SidebarJSComponent;
  let fixture: ComponentFixture<SidebarJSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarJSComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarJSComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined());
});
