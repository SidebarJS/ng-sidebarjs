import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarjsModule } from 'ng-sidebarjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SidebarjsModule.forRoot(),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
