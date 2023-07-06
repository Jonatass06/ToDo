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
        canActivate:[AuthGuardService]
    },
    {
        path: 'initialPage',
        component: PaginaInicialComponent,
        canActivate:[AuthGuardService]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate:[AuthGuardService]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'initialPage',
        canActivate:[AuthGuardService]
    }
]


@NgModule({
    imports: [RouterModule.forRoot(rotas)],
    exports: [RouterModule]
})

export class AppRountingModule { }
