import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
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
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SHARED_ANGULAR_MATERIAL
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
