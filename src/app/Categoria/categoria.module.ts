import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaComponent } from './categoria.componente';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoriaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CategoriaComponent
]
})

export class CategoriaModule { }
