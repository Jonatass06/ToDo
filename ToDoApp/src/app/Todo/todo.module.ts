import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { FormsModule } from '@angular/forms';
import { PropriedadeModule } from '../propriedade/propriedade.module';


@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
    ],
  exports: [
    TodoComponent
  ],
})

export class TodoModule { }
