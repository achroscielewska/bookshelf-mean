import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { SHARED_ANGULAR_MATERIAL } from './components/angular-material.imports';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SHARED_ANGULAR_MATERIAL
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
