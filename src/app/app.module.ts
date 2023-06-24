import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRountingModule } from './app-routing.module';
import { TodoModule } from './Todo/todo.module';
import { PesquisaModule } from './Pesquisa/pesquisa.module';
import { UserRepository } from 'src/repositories/user.repository';
import { PropriedadeModule } from './Propriedade/propriedade.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRountingModule,
    TodoModule,
    PropriedadeModule,
    PesquisaModule
  ],
  providers: [
    UserRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
