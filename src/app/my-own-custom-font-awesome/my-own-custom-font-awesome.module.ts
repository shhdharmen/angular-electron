import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
library.add(faCoffee);
@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [FontAwesomeModule],
  declarations: []
})
export class MyOwnCustomFontAwesomeModule { }
