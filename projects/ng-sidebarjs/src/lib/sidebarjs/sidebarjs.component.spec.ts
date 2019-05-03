import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarjsComponent } from './sidebarjs.component';

describe('SidebarjsComponent', () => {
  let component: SidebarjsComponent;
  let fixture: ComponentFixture<SidebarjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
