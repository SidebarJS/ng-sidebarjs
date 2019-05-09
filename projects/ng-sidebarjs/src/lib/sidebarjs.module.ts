import { ModuleWithProviders, NgModule } from '@angular/core';
import { SidebarjsComponent } from './sidebar/sidebarjs.component';
import { SidebarjsToggleDirective } from './sidebarjs-toggle.directive';
import { SidebarjsOpenDirective } from './sidebarjs-open.directive';
import { SidebarjsCloseDirective } from './sidebarjs-close.directive';
import { SidebarjsService } from './sidebarjs.service';
import { TestDirective } from './test.directive';

@NgModule({
  imports: [],
  declarations: [
    SidebarjsComponent,
    SidebarjsToggleDirective,
    SidebarjsOpenDirective,
    SidebarjsCloseDirective,
    TestDirective,
  ],
  exports: [
    SidebarjsComponent,
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
