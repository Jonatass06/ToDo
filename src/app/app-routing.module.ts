import { Route, RouterModule } from "@angular/router"
import { NgModule } from '@angular/core';
import { CategoriaComponent } from "./Categoria/categoria.componente";
import { TodoComponent } from "./Todo/todo.component";
import { PesquisaComponent } from "./Pesquisa/pesquisa.component";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";

const rotas: Route[] = [
    {
        path: 'categoria',
        component: CategoriaComponent
    },
    {
        path: 'tarefas',
        component: TodoComponent
    },
    {
        path: 'pesquisa',
        component: PesquisaComponent
    },

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tarefas'
    }
]


@NgModule({
    imports: [RouterModule.forRoot(rotas)],
    exports: [RouterModule]
})

export class AppRountingModule { }
