import { Route, RouterModule } from "@angular/router"
import { NgModule } from '@angular/core';
import { TodoComponent } from "./Todo/todo.component";
import { PesquisaComponent } from "./Pesquisa/pesquisa.component";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";
import { PropriedadeComponent } from "./Propriedade/propriedade.componente";

const rotas: Route[] = [
    {
        path: 'tarefas',
        component: TodoComponent
    },
    {
        path: 'pesquisa',
        component: PesquisaComponent
    },
    {
        path: 'propriedades',
        component: PropriedadeComponent
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
