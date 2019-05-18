[![GitHub release](https://img.shields.io/github/release/SidebarJS/ng-sidebarjs.svg)](https://github.com/SidebarJS/ng-sidebarjs/releases)
[![npm](https://img.shields.io/npm/v/ng-sidebarjs.svg)](https://www.npmjs.com/package/ng-sidebarjs)

# ng-sidebarjs
Create mobile sidebar/sidenav experiance in Angular.
> Are you looking for a version with AngularJS? Try [angular-sidebarjs](https://github.com/SidebarJS/angular-sidebarjs)

```ssh
npm install ng-sidebarjs --save
```

## Demo
*Open the demo on your device and try the touch gestures!*

* [Simple Demo](https://stackblitz.com/edit/ng-sidebarjs)

## Options
```html
<sidebarjs-element
  // Optional | Required only for multiple sidebarjs
  [sidebarjsName]="'myCustomName'"
  
  // Optional
  [sidebarjsConfig]="{
    // Check https://github.com/SidebarJS/sidebarjs#options for all available options
  }"
  
  // Optional | Function called after sidebar is open
  (open)="onOpenSidebar()"
  
  // Optional | Function called after sidebar is close
  (close)="onCloseSidebar()"
  
  // Optional | Function called when sidebar change visibility
  (changeVisibility)="onChangeVisibility($event)">
</sidebarjs-element>
```

## Implementation
### Import Module
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SidebarjsModule } from 'ng-sidebarjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SidebarjsModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
```

### Create `sidebarjs-element`
Write **sidebarjs-element** tag and a trigger element with just **[sidebarjsToggle|sidebarjsOpen|sidebarjsClose]** attribute.
```html
<div sidebarjsOpen>Open Sidebar!</div>

<sidebarjs-element>
  Hello!
</sidebarjs-element>
```

## Migrate from <=4.0.0 to 6.0.0
Naming convention become consistent for all components/directives/services: everything that was SidebarJSName, now is SidebarjsName.

|<=4.0.0|6.0.0|
|----------|----------|
| SidebarJSModule | SidebarjsModule |
| SidebarJSService | SidebarjsService |
| \<sidebar-js\> | \<sidebarjs-element\> |
| [sidebarjsOpen] | [sidebarjsOpen] |
| [sidebarjsClose] | [sidebarjsClose] |
| [sidebarjsToggle] | [sidebarjsToggle] |
