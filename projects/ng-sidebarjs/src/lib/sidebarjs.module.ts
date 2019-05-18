import { ModuleWithProviders, NgModule } from '@angular/core';
import { SidebarjsElementComponent } from './sidebarjs-element/sidebarjs-element.component';
import { SidebarjsToggleDirective } from './sidebarjs-toggle.directive';
import { SidebarjsOpenDirective } from './sidebarjs-open.directive';
import { SidebarjsCloseDirective } from './sidebarjs-close.directive';
import { SidebarjsService } from './sidebarjs.service';

@NgModule({
  imports: [],
  declarations: [
    SidebarjsElementComponent,
    SidebarjsToggleDirective,
    SidebarjsOpenDirective,
    SidebarjsCloseDirective,
  ],
  exports: [
    SidebarjsElementComponent,
    SidebarjsToggleDirective,
    SidebarjsOpenDirective,
    SidebarjsCloseDirective,
  ],
})
export class SidebarjsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SidebarjsModule,
      providers: [SidebarjsService],
    };
  }
}
