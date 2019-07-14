import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { SHARED_ANGULAR_MATERIAL, HeaderComponent } from '@app/components';
import { BookEditorComponent, BookListComponent } from '@app/components/books';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookEditorComponent,
    BookListComponent
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
