import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ]
})
// tslint:disable-next-line:class-name
export class SHARED_ANGULAR_MATERIAL {}
