import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropriedadeComponent } from './propriedade.componente';
import { FormsModule } from '@angular/forms';
import { UserLogIn } from 'src/services/userLogIn';


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
  providers:[
    UserLogIn
  ]
})

export class PropriedadeModule { }
