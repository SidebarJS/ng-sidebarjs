import { ModuleWithProviders, NgModule } from '@angular/core';

import { SidebarJSComponent } from './sidebarjs/sidebarjs.component';
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
