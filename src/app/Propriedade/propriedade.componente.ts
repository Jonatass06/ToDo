import { AfterViewChecked, Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { User } from "src/models/users/user";
import { UserRepository } from "src/repositories/user.repository";

//Propriedade----------------------------------------------------------------------------------
interface Propriedade {
    nome: string,
    tipo: string,
    valor?: any,
    opcoes: string[],
    visivel:boolean
  }

@Component({
    templateUrl: './propriedade.component.html',
    styleUrls: ['./propriedade.component.css']
})

export class PropriedadeComponent  {


    

    private userId: string = 'jorge.mendonca';
    private users: User[] = [];
    user!: User;
  
    hasPermission(permission: string): boolean {
        return this.user.propertiesPermissions.some((propertyPermission) => {
          return propertyPermission === permission;
        });
      }
    
      private getUsuarioLogado(): User {
        return this.users.find((user) => {
          return user.id === this.userId
        }) as User;
      }


      constructor(private userRepository :UserRepository)
      {
           this.users = this.userRepository.getUsers();
         this.user = this.getUsuarioLogado();
         console.log(this.user);
       }
     

    listaDePropriedade:Propriedade[] = [];
    propriedadeCadastro:Propriedade = {
        nome:"",
        tipo:"",
        visivel:true,
        opcoes:[]
    }
    opcaoACadastrar:string;

    ngOnInit():void{
        if(localStorage.getItem("listaDePropriedades")!=undefined){
            this.listaDePropriedade = JSON.parse(localStorage.getItem("listaDePropriedades"));
        }
    }

    getOpcoes(propriedade):string[]{
        if(propriedade.tipo == "select"){
            console.log(propriedade)
            return propriedade.opcoes;
        }
        return ["Nenhuma"];
    }

    visibilidade(propriedade:Propriedade):string{
        if(propriedade.visivel){
            return "https://cdn-icons-png.flaticon.com/512/60/60809.png"
        } else{
            return "https://cdn-icons-png.flaticon.com/512/60/60533.png"
        }
    }

    mudarVisibilidade(propriedade:Propriedade):void{
        if(propriedade.visivel){
            propriedade.visivel = false;
        }else{
            propriedade.visivel = true;
        }
        localStorage.setItem("listaDePropriedades", JSON.stringify(this.listaDePropriedade));
        
    }

    cadastrarOpcao():void{
        this.propriedadeCadastro.opcoes.push(this.opcaoACadastrar);
        this.opcaoACadastrar = "";
    }
    deletarOpcao(opcao:string):void{
        let opcoes = this.propriedadeCadastro.opcoes;
        opcoes.splice(opcoes.indexOf(opcao), 1)
    }
    cadastrarPropriedade():void{
        let duplicado:boolean = false;
        for(let prop of this.listaDePropriedade){
            if(prop.nome == this.propriedadeCadastro.nome &&
                prop.tipo == this.propriedadeCadastro.tipo){
                    duplicado = true;
                }
        }
        if(this.propriedadeCadastro.nome.trim() != "" &&
            this.propriedadeCadastro.tipo != "" && !duplicado){
            this.listaDePropriedade.push({
                nome:this.propriedadeCadastro.nome,
                tipo:this.propriedadeCadastro.tipo,
                visivel:true,
                opcoes:this.propriedadeCadastro.opcoes
            })
            localStorage.setItem("listaDePropriedades", JSON.stringify(this.listaDePropriedade));
            // if(localStorage.getItem("listaTarefas") != undefined){
            //     let tarefas:any = JSON.parse(localStorage.getItem("listaTarefas"))
            //     for(let tarefa of tarefas){
            //        if(tarefa != undefined){
            //         tarefa.propriedades.pushz(this.propriedadeCadastro)                        
            //        }
            //     } 
            // }
            this.propriedadeCadastro = {
                nome:"",
                tipo:"",
                visivel:true,
                opcoes:[]
            }
        }
    }

    excluirPropriedade(propriedade:Propriedade){
        this.listaDePropriedade.splice(this.listaDePropriedade.indexOf(propriedade));
        localStorage.setItem("listaDePropriedades", JSON.stringify(this.listaDePropriedade));
    }

    mudaOpcoes(valor:string, indice:number, propriedade:Propriedade){
        propriedade.opcoes[indice] = valor;
        localStorage.setItem("listaDePropriedades", JSON.stringify(this.listaDePropriedade))
    }

    muda():void{
        localStorage.setItem("listaDePropriedades", JSON.stringify(this.listaDePropriedade))
    }
}