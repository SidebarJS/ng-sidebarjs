import { ModuleWithProviders, NgModule } from '@angular/core';
import { SidebarjsComponent } from './sidebarjs/sidebarjs.component';
import { SidebarService } from "sidebarjs";
import { SidebarjsToggleDirective } from './sidebarjs-toggle/sidebarjs-toggle.directive';

@NgModule({
  declarations: [SidebarjsComponent, SidebarjsToggleDirective],
  imports: [],
  exports: [SidebarjsComponent, SidebarjsToggleDirective],
})
export class SidebarjsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SidebarjsModule,
      providers: [SidebarService],
    };
  }
}
