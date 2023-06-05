import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaComponent } from './pesquisa.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PesquisaComponent
  ]
})

export class PesquisaModule { }
