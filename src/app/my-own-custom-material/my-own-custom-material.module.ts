import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule
  ],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule],
  declarations: []
})
export class MyOwnCustomMaterialModule { }
