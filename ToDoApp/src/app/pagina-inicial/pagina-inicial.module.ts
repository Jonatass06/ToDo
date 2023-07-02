import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthGuardService } from 'src/services/auth-guard.service';
import { TodoModule } from '../Todo/todo.module';
import { PropriedadeModule } from '../Propriedade/propriedade.module';
import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { PaginaInicialComponent } from './pagina-inicial.component';


@NgModule({
  declarations: [
    PaginaInicialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TodoModule,
    PropriedadeModule,
    CadastroComponent,
    HttpClientModule
  ],
  exports: [
  PaginaInicialComponent
  ],
  providers:[
    UserRepository,
    AuthGuardService
  ]
})

export class PaginaInicialModule { }
