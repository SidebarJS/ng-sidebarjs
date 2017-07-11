import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarJSModule } from 'ng-sidebarjs';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, SidebarJSModule.forRoot()],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
