import { TestBed } from '@angular/core/testing';
import { SidebarJSService } from './sidebarjs.service';
import * as SidebarJS from 'sidebarjs';

const createSidebar = (sidebarName: string = '') => {
  const component = document.createElement('div');
  const container = document.createElement('div');
  const backdrop = document.createElement('div');
  component.setAttribute('sidebarjs', sidebarName);
  container.setAttribute('sidebarjs-container', '');
  backdrop.setAttribute('sidebarjs-backdrop', '');
  component.appendChild(container);
  component.appendChild(backdrop);
  return {component, container, backdrop};
};

describe('SidebarJSService', () => {
  let service: SidebarJSService;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [SidebarJSService]
    });
    service = bed.get(SidebarJSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be create', () => {
    const instance = service.create(createSidebar());
    // expect(instance instanceof SidebarJS).toBeTruthy();
    expect(Object.keys(service['instances']).length).toBe(1);
    const instanceNamed = service.create(createSidebar('testName'));
    // expect(instanceNamed instanceof SidebarJS).toBeTruthy();
    expect(Object.keys(service['instances']).length).toBe(2);
    expect(service['instances'].testName).toBeDefined();
  });

  it('should be opened', () => {
    const sidebarName = 'testOpen';
    service.create(createSidebar(sidebarName));
    service.open(sidebarName);
    expect(service['instances'][sidebarName]).toBeDefined();
    expect(service.isVisible(sidebarName)).toBe(true);
  });

  it('should be closed', () => {
    const sidebarName = 'testClose';
    service.create(createSidebar(sidebarName));
    service.open(sidebarName);
    expect(service.isVisible(sidebarName)).toBe(true);
    service.close(sidebarName);
    expect(service.isVisible(sidebarName)).toBe(false);
  });

  it('should be toggled', () => {
    const sidebarName = 'testToggle';
    service.create(createSidebar(sidebarName));
    service.toggle(sidebarName);
    expect(service.isVisible(sidebarName)).toBe(true);
    service.toggle(sidebarName);
    expect(service.isVisible(sidebarName)).toBe(false);
    service.toggle(sidebarName);
    expect(service.isVisible(sidebarName)).toBe(true);
  });

  it('should change position', () => {
    const instance = service.create(createSidebar());
    expect(instance.position).toBe('left');
    service.setPosition('right');
    expect(instance.position).toBe('right');
  });

  it('should check/set listener property', () => {
    const div = document.createElement('div');
    expect(service.elemHasListener(div)).toBe(false);
    service.elemHasListener(div, true);
    expect(service.elemHasListener(div)).toBe(true);
    service.elemHasListener(div, false);
    expect(service.elemHasListener(div)).toBe(false);
  });

  it('should destroy instance', () => {
    const sidebarName = 'testDestroy';
    expect(Object.keys(service['instances']).length).toBe(0);
    service.create(createSidebar(sidebarName));
    expect(service['instances'][sidebarName]).toBeDefined();
    expect(Object.keys(service['instances']).length).toBe(1);
    service.destroy(sidebarName);
    expect(service['instances'][sidebarName]).toBeUndefined();
    expect(Object.keys(service['instances']).length).toBe(0);
  });
});
