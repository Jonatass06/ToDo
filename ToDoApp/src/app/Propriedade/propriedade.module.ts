import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropriedadeComponent } from './propriedade.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PropriedadeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PropriedadeComponent
  ],
})

export class PropriedadeModule { }
