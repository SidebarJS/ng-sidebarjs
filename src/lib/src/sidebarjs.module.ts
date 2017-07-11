import { ModuleWithProviders, NgModule } from '@angular/core';

import { SidebarJSComponent } from './sidebar-js/sidebar-js.component';
import { SidebarJSService } from './sidebarjs.service';

@NgModule({
  declarations: [SidebarJSComponent],
  exports: [SidebarJSComponent]
})

export class SidebarJSModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SidebarJSModule,
      providers: [SidebarJSService],
    };
  }
}
