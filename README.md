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

* <a href="https://www.webpackbin.com/bins/-KowIAML_Tti73FWyyzp" target="_blank">Simple Demo</a>

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
