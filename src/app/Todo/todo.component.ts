import { Component, Renderer2, ElementRef, OnInit, Output, EventEmitter, ViewChild, AfterContentInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { User } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.repository';
//Propriedade----------------------------------------------------------------------------------
interface Propriedade {
  nome: string,
  tipo: string,
  valor?: any,
  opcoes: string[],
  visivel: boolean
}
//Propriedade----------------------------------------------------------------------------------
interface Tarefa {
  titulo: string,
  propriedades: Propriedade[]
}

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  //-----------------------------------------------------------------------------------------------------

  private userId: string = 'jorge.mendonca';
  private users: User[] = [];
  user!: User;




  filtroDeTarefas:Propriedade;
  listaDePropriedade: Propriedade[] = [];
  tarefaArrastando: Tarefa;
  tarefaAbaixo: Tarefa;

  //tarefa usada para cadastro
  tarefaCadastro: Tarefa = {
    titulo: "",
    propriedades: []
  }

  propriedadeFiltro: string;
  valoresIncluidos: any[] = [];

  mudaFiltro():void{
    this.filtroDeTarefas = JSON.parse(this.propriedadeFiltro)
  }

  tiraOcultas(): Propriedade[] {
    let lista: Propriedade[] = [];
    for (let propriedade of this.listaDePropriedade) {
      if (propriedade.visivel) {
        lista.push(propriedade)
      }
    }
    return lista;
  }

  pegaValor(propriedade: Propriedade): string {
    return JSON.stringify(propriedade);
  }

  filtrar() {
    var lista = [];
    var adicionar: boolean = true;

    if (this.filtroDeTarefas != undefined) {
      if (this.filtroDeTarefas.tipo != 'select') {
        for (let valor of this.valoresIncluidos) {
          if (valor.nome == JSON.parse(this.propriedadeFiltro).nome) {
            adicionar = true;
            for (let valorTeste of lista) {
              if (valor.valor == valorTeste.valor) {
                adicionar = false;
              }
            }
            if (adicionar) {
              lista.push(valor.valor);
            }
          }
        }
      }
      if (JSON.parse(this.propriedadeFiltro).tipo == 'text') {
        lista.sort();
      }
      else if (JSON.parse(this.propriedadeFiltro).tipo == 'number') {
        lista.sort((a, b) => a - b);
      }
      else if (JSON.parse(this.propriedadeFiltro).tipo == 'select') {
        for (let opcao of JSON.parse(this.propriedadeFiltro).opcoes) {
          lista.push(opcao);
        }
      }
    }
    lista.push("")
    return lista;
  }
  filtrarTarefa(valor: string) {
    let lista = [];
    if (this.propriedadeFiltro != undefined) {
      for (let tarefa of this.listaDeTarefas) {
        if (tarefa != undefined) {
          for (let propriedade of tarefa.propriedades) {
            if (propriedade.nome == this.filtroDeTarefas.nome &&
              propriedade.valor == valor) {
              lista.push(tarefa);
            }
          }
        }
      }
    }
    return lista;
  }

  cadastrarTarefa(): void {

    let lista: Propriedade[] = [];
    for (let propriedade of this.tarefaCadastro.propriedades) {
      this.valoresIncluidos.push(
        {
          nome: propriedade.nome,
          tipo: propriedade.tipo,
          valor: propriedade.valor
        }
      )
      lista.push(
        {
          nome: propriedade.nome,
          tipo: propriedade.tipo,
          visivel: propriedade.visivel,
          opcoes: propriedade.opcoes,
          valor: propriedade.valor
        }
      )
      propriedade.valor = "";
    }

    this.listaDeTarefas.push({
      titulo: this.tarefaCadastro.titulo,
      propriedades: lista
    })
    this.tarefaCadastro.titulo = "";

    localStorage.setItem("valoresIncluidos", JSON.stringify(this.valoresIncluidos));
    localStorage.setItem("listaTarefas", JSON.stringify(this.listaDeTarefas));
  }
  //-----------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------

  drop(event: DragEvent, filtro: string): void {
    event.preventDefault();
    let propriedadeFiltro = JSON.parse(this.propriedadeFiltro);
    for (let propriedade of this.tarefaArrastando.propriedades) {
      if (propriedade.nome == propriedadeFiltro.nome) {
        propriedade.valor = filtro;
        if (this.listaDeTarefas.indexOf(this.tarefaArrastando) > this.listaDeTarefas.indexOf(this.tarefaAbaixo)) {
          this.listaDeTarefas.splice(this.listaDeTarefas.indexOf(this.tarefaArrastando), 1);
          this.listaDeTarefas.splice(this.listaDeTarefas.indexOf(this.tarefaAbaixo), 0, this.tarefaArrastando)
        }
        else {
          this.listaDeTarefas.splice(this.listaDeTarefas.indexOf(this.tarefaArrastando), 1);
          this.listaDeTarefas.splice(this.listaDeTarefas.indexOf(this.tarefaAbaixo) + 1, 0, this.tarefaArrastando)
        }
      }
    }
    localStorage.setItem("listaTarefas", JSON.stringify(this.listaDeTarefas));
  }

  defineTarefaArrastando(tarefa: Tarefa): void {
    this.tarefaArrastando = tarefa;
  }
  defineTarefaAbaixo(event: DragEvent, tarefa: Tarefa): void {
    event.preventDefault();
    this.tarefaAbaixo = tarefa;
  }
  tiraBloqueio(event: DragEvent): void {
    event.preventDefault();
  }

  seTipoSelecao(): boolean {
    if (JSON.parse(this.propriedadeFiltro).tipo == "select") {
      return true;
    }
    return false;
  }

  //lista de tarefas
  listaDeTarefas: Tarefa[] = [];
  //variavel que faz aparecer inputs de cadastro
  cadastro: boolean = false;
  //pesquisa
  pesquisa: string = ''
  //referentes ao drag

  @ViewChild('cadastro2') myElementRef: ElementRef;

  constructor(private userRepository: UserRepository) {
    this.users = this.userRepository.getUsers();
    this.user = this.getUsuarioLogado();
    console.log(this.user);
  }


  ngOnInit() {
    //pega a lista de tarefas
    if (localStorage.getItem("listaTarefas") != null) {
      this.listaDeTarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    }
    if (localStorage.getItem("valoresIncluidos") != null) {
      this.valoresIncluidos = JSON.parse(localStorage.getItem("valoresIncluidos"));
    }
    //pega a lista de propriedades
    if (localStorage.getItem("listaDePropriedades") != null) {
      this.listaDePropriedade = JSON.parse(localStorage.getItem("listaDePropriedades"));
      this.tarefaCadastro.propriedades = this.listaDePropriedade
    }
    //temporario
    this.propriedadeFiltro = JSON.stringify(this.listaDePropriedade[0])
    this.mudaFiltro();
  }


  // metodo para deletar uma tarefa
  excluirTarefas(tarefa: Tarefa) {
    this.listaDeTarefas.splice(this.listaDeTarefas.indexOf(tarefa), 1);
    localStorage.setItem("listaTarefas", JSON.stringify(this.listaDeTarefas));
  }
  hasPermission(permission: string): boolean {
    return this.user.cardPermissions.some((cardPermission) => {
      return cardPermission === permission;
    });
  }

  private getUsuarioLogado(): User {
    return this.users.find((user) => {
      return user.id === this.userId
    }) as User;
  }
  mudar() {
    localStorage.setItem("listaTarefas", JSON.stringify(this.listaDeTarefas))
  }
}