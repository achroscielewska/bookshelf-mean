import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookEditorComponent, BookListComponent } from '@app/components/books';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'create', component: BookEditorComponent },
  { path: 'edit/:id', component: BookEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
