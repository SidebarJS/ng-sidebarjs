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

* [Simple Demo](https://stackblitz.com/edit/angular-skpdxr)

## Options
```html
<sidebar-js
  // Optional | Required only for multiple sidebarjs
  [sidebarjsName]="'myCustomName'"
  
  // Optional
  [sidebarjsConfig]="{
    // Minimum swipe in px required to trigger listener: open
    documentMinSwipeX?: 10,
    // Range in px where document is listening for gesture: open
    documentSwipeRange?: 40,
    // Open and close sidebar with swipe gestures
    nativeSwipe?: true,
    // Enable/Disable open on swipe
    nativeSwipeOpen?: true,
    // Sidebar position, accepted values: left|right
    position?: 'left',
    // Backdrop opacity on sidebar open
    backdropOpacity?: 0.3,
  }"
  
  // Optional | Function called after sidebar is open
  (open)="onOpenSidebar()"
  
  // Optional | Function called after sidebar is close
  (close)="onCloseSidebar()"
  
  // Optional | Function called when sidebar change visibility
  (changeVisibility)="onChangeVisibility($event)">
</sidebar-js>
```

## Implementation
### Import Module
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { SidebarJSModule } from 'ng-sidebarjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SidebarJSModule.forRoot()
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
```

### Create `sidebar-js` element
Write **sidebar-js** tag and a trigger element with just **[sidebarjsToggle|sidebarjsOpen|sidebarjsClose]** attribute.
```html
<div sidebarjsOpen>Open Sidebar!</div>

<sidebar-js>
  Hello!
</sidebar-js>
```
