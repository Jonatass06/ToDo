import { Route, RouterModule } from "@angular/router"
import { NgModule } from '@angular/core';
import { CategoriaComponent } from "./Categoria/categoria.componente";
import { TodoComponent } from "./Todo/todo.component";

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
