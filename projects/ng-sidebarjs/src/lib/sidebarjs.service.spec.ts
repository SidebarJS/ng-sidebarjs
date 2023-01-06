import { TestBed } from '@angular/core/testing';
import { SidebarjsService, SidebarConfig, HTMLSidebarElement } from './sidebarjs.service';

export const SidebarjsMock = {
  create: (config: SidebarConfig) => 'sidebarjsMock',
  elemHasListener: (element: HTMLSidebarElement) => 'sidebarjsMock',
  open: (name: string) => 'sidebarjsMock',
  close: (name: string) => 'sidebarjsMock',
  toggle: (name: string) => 'sidebarjsMock',
  destroy: (name: string) => 'sidebarjsMock'
};

export const createSidebar = (sidebarName: string = '') => {
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

const getInstances = (service: SidebarjsService) => (service as any).instances;

describe('SidebarjsService', () => {
  let service: SidebarjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [SidebarjsService]});
    service = TestBed.get(SidebarjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a sidebar with name', () => {
    const instance = service.create(createSidebar());
    expect(instance.constructor.name).toBe('SidebarElement');
    expect(Object.keys(getInstances(service)).length).toBe(1);
    const instanceNamed = service.create(createSidebar('testName'));
    expect(instanceNamed.constructor.name).toBe('SidebarElement');
    expect(Object.keys(getInstances(service)).length).toBe(2);
    expect(getInstances(service).testName).toBeDefined();
  });

  it('should be opened', () => {
    const sidebarName = 'testOpen';
    service.create(createSidebar(sidebarName));
    service.open(sidebarName);
    expect(getInstances(service)[sidebarName]).toBeDefined();
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
    expect(Object.keys(getInstances(service)).length).toBe(0);
    service.create(createSidebar(sidebarName));
    expect(getInstances(service)[sidebarName]).toBeDefined();
    expect(Object.keys(getInstances(service)).length).toBe(1);
    service.destroy(sidebarName);
    expect(getInstances(service)[sidebarName]).toBeUndefined();
    expect(Object.keys(getInstances(service)).length).toBe(0);
  });
});
