import { NgModule } from '@angular/core';

import { SidebarJSComponent } from './sidebar-js/sidebar-js.component';
import { LibService } from './service/lib.service';

@NgModule({
  declarations: [SidebarJSComponent],
  providers: [LibService],
  exports: [SidebarJSComponent]
})
export class LibModule { }
