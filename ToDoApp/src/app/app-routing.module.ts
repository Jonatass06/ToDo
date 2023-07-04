import { Route, RouterModule } from "@angular/router"
import { NgModule } from '@angular/core';
import { TodoComponent } from "./todo/todo.component";
import { PropriedadeComponent } from "./propriedade/propriedade.componente";
import { AuthGuardService } from "src/services/auth-guard.service";
import { PaginaInicialComponent } from "./pagina-inicial/pagina-inicial.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { LoginComponent } from "./login/login.component";

const rotas: Route[] = [
    {
        path: 'singup',
        component: CadastroComponent,
    },
    {
        path: 'initialPage',
        component: PaginaInicialComponent,
        canActivate:[AuthGuardService]
    },
    {
        path: 'tasks',
        component: TodoComponent,
        canActivate:[AuthGuardService]
    },
    {
        path: 'properties',
        component: PropriedadeComponent,
        canActivate:[AuthGuardService]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'singup'
    }
]


@NgModule({
    imports: [RouterModule.forRoot(rotas)],
    exports: [RouterModule]
})

export class AppRountingModule { }
