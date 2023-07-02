import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { FormsModule } from '@angular/forms';
import { PropriedadeModule } from '../Propriedade/propriedade.module';
import { UserLogIn } from 'src/services/userLogIn';


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
  providers:[
    UserLogIn
  ]
})

export class TodoModule { }
