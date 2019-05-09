import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarjsComponent } from '../sidebar/sidebarjs.component';
import { SidebarjsService } from '../sidebarjs.service';

const SidebarjsMock = {
  create(config) {
  },
  destroy(name) {
  }
};

describe('SidebarjsComponent', () => {
  let component: SidebarjsComponent;
  let fixture: ComponentFixture<SidebarjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarjsComponent],
      providers: [{provide: SidebarjsService, useFactory: () => SidebarjsMock}]
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
