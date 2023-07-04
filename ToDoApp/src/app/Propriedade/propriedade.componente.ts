import { AfterViewChecked, Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { Property } from "src/models/tasks/properties";
import { Task } from "src/models/tasks/task";
import { User } from "src/models/users/user";
import { UserRepository } from "src/repositories/user.repository";

@Component({
    selector: 'property-app',
    templateUrl: './propriedade.component.html',
    styleUrls: ['./propriedade.component.css']
})

export class PropriedadeComponent {
    //---------------------------------------------Geral------------------------------------------------
    listaDePropriedades: Property[] = [];

    ngOnInit(): void {
        if (localStorage.getItem("listaDePropriedades") != undefined) {
            this.listaDePropriedades = JSON.parse(localStorage.getItem("listaDePropriedades"));
        }
        //=======================================
        var cookieName = "User=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');

        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                this.user = JSON.parse(cookie.substring(cookieName.length, cookie.length));
            }
        }
        //=========================================
    }

    //---------------------------------------------Usuario------------------------------------------------
    private userId: string = 'diogo.defante';
    private users: User[] = [];
    private user: User | undefined;

    constructor(private userRepository: UserRepository) {
        userRepository.getUsers().subscribe({
            next: (value) => {
                this.users = value
                console.log(value)
            }
        })
    }
    //define se o usuario cadastrado tem permissão para determinada ação
    hasPermission(permission: string): boolean {
        // if (this.user != undefined) {
        //     return this.user.propertiesPermissions.some((propertiesPermission) => {
        //         return propertiesPermission === permission;
        //     });
        // } else {
        //     return false;
        // }
        return true;
    }
    //---------------------------------------------Cadastro------------------------------------------------

    cadastro: boolean = false;

    propriedadeCadastro: Property = new Property("", "", [], true)

    //metodo que cadastra nova propriedade
    cadastrarPropriedade(): void {
        let duplicado: boolean = false;
        for (let prop of this.listaDePropriedades) {
            if (prop.name == this.propriedadeCadastro.name &&
                prop.type == this.propriedadeCadastro.type) {
                duplicado = true;
            }
        }
        if (this.propriedadeCadastro.name.trim() != "" &&
            this.propriedadeCadastro.type != "" && !duplicado) {
            this.listaDePropriedades.push(new Property(
                this.propriedadeCadastro.name,
                this.propriedadeCadastro.type,
                this.propriedadeCadastro.options,
                this.propriedadeCadastro.visibility
            ))
            this.salvar();
            if (localStorage.getItem("listaTarefas") != undefined) {
                let tarefas: any = JSON.parse(localStorage.getItem("listaTarefas"))
                for (let tarefa of tarefas) {
                    if (tarefa != undefined) {
                        let propriedade = new Property(
                            this.propriedadeCadastro.name,
                            this.propriedadeCadastro.type,
                            this.propriedadeCadastro.options,
                            this.propriedadeCadastro.visibility,
                            ""
                        )
                        tarefa.properties.push(propriedade)
                    }
                }
                localStorage.setItem("listaTarefas", JSON.stringify(tarefas))
            }
        }
        else {
            //mensagem de erro
        }
        this.propriedadeCadastro = new Property("", "", [], true)

    }

    //mostra ou esconde os inputs de cadastro de propriedade
    mudaCadastro() {
        this.cadastro = this.cadastro ? false : true;
        this.adicionarOpcao ? this.abrirCadastroOpcao(this.propriedadeCadastro) : null;
    }

    //------------------------------------------Opcoes da Propriedades----------------------------------------
    adicionarOpcao: boolean = false;
    opcaoACadastrar: string;

    //pegas as opcoes de determinada propriedade
    getOpcoes(propriedade): string[] {
        if (propriedade.type == "select") {
            return propriedade.options;
        }
        return ["Nenhuma"];
    }

    abrirCadastroOpcao(propriedade: Property): void {
        if (this.adicionarOpcao) {
            this.adicionarOpcao = false;
            this.propriedadeCadastro = new Property("", "", [], true);
        } else {
            this.adicionarOpcao = true;
            this.propriedadeCadastro = propriedade
        }
        this.salvar();
    }

    //cadastra uma opcao para determinada propriedade
    cadastrarOpcao(propriedade: Property): void {
        let pode: boolean = true;
        for (let opcao of this.propriedadeCadastro.options) {
            if (this.opcaoACadastrar == opcao) {
                pode = false;
            }
        }
        if (pode) {
            propriedade.options.push(this.opcaoACadastrar);
            this.opcaoACadastrar = "";
            this.salvar();
        } else {
            //mensagem de erro
        }
        this.mudarOpcoesNasTarefas(propriedade);
    }

    //deleta uma opcao de determinada propriedade
    deletarOpcao(opcao: string, propriedade: Property): void {
        propriedade.options.splice(propriedade.options.indexOf(opcao), 1);
        this.salvar();
        this.mudarOpcoesNasTarefas(propriedade);
    }

    mudarOpcoesNasTarefas(propriedade: Property): void {
        if (localStorage.getItem("listaTarefas") != undefined) {
            let listaTarefas = JSON.parse(localStorage.getItem("listaTarefas"));
            for (let tarefa of listaTarefas) {
                for (let prop of tarefa.properties) {
                    if (propriedade.name == prop.name &&
                        propriedade.type == prop.type) {
                        prop.options = propriedade.options;
                        localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
                    }
                }
            }
        }
    }

    //edita as opcoes de determinada propriedade
    mudaOpcoes(valor: string, indice: number, propriedade: Property) {
        propriedade.options[indice] = valor;
        this.salvar();
        this.mudarOpcoesNasTarefas(propriedade);
    }
    //--------------------------------------Visibilidade de Propriedades--------------------------------------

    //muda a imagem do botao de visibilidade de propriedade
    visibilidade(propriedade: Property): string {
        return propriedade.visibility ?
            "https://cdn-icons-png.flaticon.com/512/60/60809.png" :
            "https://cdn-icons-png.flaticon.com/512/60/60533.png"
    }

    //muda a visibilidade de uma propriedade
    mudarVisibilidade(propriedade: Property): void {
        propriedade.visibility = propriedade.visibility ? false : true;
        this.salvar();
    }

    //------------------------------------------Editar Propriedade----------------------------------------

    antigaProp: Property;

    //eclui uma propriedade
    excluirPropriedade(propriedade: Property) {
        console.log(propriedade)
        this.listaDePropriedades.splice(this.listaDePropriedades.indexOf(propriedade), 1);
        this.salvar();
    }

    defineAntigaProp(propriedade: Property) {
        this.antigaProp = new Property(
            propriedade.name,
            propriedade.type,
            propriedade.options,
            propriedade.visibility,
        );
    }
    //muda determinado valor de uma propriedade
    muda(propriedade: Property): void {
        for (let prop of this.listaDePropriedades) {

            if (prop != propriedade &&
                prop.name == propriedade.name &&
                prop.type == propriedade.type) {
                propriedade.type = this.antigaProp.type;
                propriedade.name = this.antigaProp.name;
                break
            }
        }

        let listaTarefas = this.pegarListaTarefas();
        if (listaTarefas != null) {
            for (let tarefa of listaTarefas) {
                for (let prop of tarefa.properties) {
                    if (prop.name == this.antigaProp.name &&
                        prop.type == this.antigaProp.type) {
                        prop.value = prop.type != this.antigaProp.type ? null : prop.value;
                        prop.type = propriedade.type;
                        prop.name = propriedade.name;
                        prop.options = propriedade.options;
                    }
                }
            }
            localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas))
        }
        this.salvar();
    }
    salvar(): void {
        localStorage.setItem("listaDePropriedades", JSON.stringify(this.listaDePropriedades))
    }

    seTipoSelecao(propriedade: Property) {
        return propriedade.type == 'select' ? true : false;
    }

    igualAPropriedade(Propriedade: Property) {
        return this.propriedadeCadastro == Propriedade;
    }
    mudarPropriedadeNaTarefa(propriedade: Property) {
        let listaTarefas = this.pegarListaTarefas();
    }

    pegarListaTarefas() {
        if (localStorage.getItem('listaTarefas') != null) {
            return JSON.parse(localStorage.getItem('listaTarefas'));
        }
        return null;
    }
}