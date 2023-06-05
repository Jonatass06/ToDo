import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRountingModule } from './app-routing.module';
import { CategoriaModule } from './Categoria/categoria.module';
import { TodoModule } from './Todo/todo.module';
import { PesquisaModule } from './Pesquisa/pesquisa.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRountingModule,
    CategoriaModule,
    TodoModule,
    PesquisaModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
