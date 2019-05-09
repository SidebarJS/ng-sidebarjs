import { ModuleWithProviders, NgModule } from '@angular/core';
import { SidebarService } from 'sidebarjs';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarjsToggleDirective } from './sidebarjs-toggle.directive';
import { SidebarjsOpenDirective } from './sidebarjs-open.directive';
import { SidebarjsCloseDirective } from './sidebarjs-close.directive';

@NgModule({
  imports: [],
  declarations: [
    SidebarComponent,
    SidebarjsToggleDirective,
    SidebarjsOpenDirective,
    SidebarjsCloseDirective,
  ],
  exports: [
    SidebarComponent,
    SidebarjsToggleDirective,
    SidebarjsOpenDirective,
    SidebarjsCloseDirective,
  ],
})
export class SidebarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SidebarModule,
      providers: [SidebarService],
    };
  }
}
