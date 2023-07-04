import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRountingModule } from './app-routing.module';
import { TodoModule } from './todo/todo.module';
import { UserRepository } from 'src/repositories/user.repository';
import { PropriedadeModule } from './propriedade/propriedade.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from 'src/services/auth-guard.service';
import { CadastroComponent } from './cadastro/cadastro.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CardPermissionsRepository } from 'src/repositories/cardPermissions';


@NgModule({
  declarations: [
    CadastroComponent,
    AppComponent,
    PaginaInicialComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PropriedadeModule,
    AppRountingModule,
    TodoModule,
    HttpClientModule
  ],
  providers: [
    UserRepository,
    CardPermissionsRepository,
    AuthGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
