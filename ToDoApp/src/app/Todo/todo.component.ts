import { Component, Renderer2, ElementRef, OnInit, Output, EventEmitter, ViewChild, AfterContentInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from 'src/models/tasks/properties';
import { Task } from 'src/models/tasks/task';
import { CardPermissions } from 'src/models/users/cardPermissions';
import { User } from 'src/models/users/user';
import { CardPermissionsRepository } from 'src/repositories/cardPermissions';
import { UserRepository } from 'src/repositories/user.repository';

@Component({
  selector: 'todo-app',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {

  //-----------------------------------Geral------------------------------------------------

  listaDePropriedade: Property[] = [];
  listaDeTarefas: Task[] = [];

  @ViewChild('cadastro2') myElementRef: ElementRef;

  ngOnInit() {
    //pega a lista de tarefas
    if (localStorage.getItem("listaTarefas") != null) {
      this.listaDeTarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    }
    //pega a lista de propriedades
    if (localStorage.getItem("listaDePropriedades") != null) {
      this.listaDePropriedade = JSON.parse(localStorage.getItem("listaDePropriedades"));
      this.tarefaCadastro.properties = this.listaDePropriedade
    }
    //temporario
    this.propriedadeFiltro = JSON.stringify(this.listaDePropriedade[0])
    this.mudaFiltro();
  }

  //-------------------------------------------Drag and Drop---------------------------------------------------

  tarefaArrastando: Task;
  tarefaAbaixo: Task;

  //define a tarefa que está sendo arrastada
  defineTarefaArrastando(tarefa: Task): void {
    this.tarefaArrastando = tarefa;
  }

  //define a tarefa abaixo do drop
  defineTarefaAbaixo(event: DragEvent, tarefa: Task): void {
    event.preventDefault();
    this.tarefaAbaixo = tarefa;
  }

  //tira o icone de bloqueio ao arrastar tarefa
  tiraBloqueio(event: DragEvent): void {
    event.preventDefault();
  }

  //função que muda determinada propriedade com o drag and drop
  drop(event: DragEvent, filtro: string): void {
    event.preventDefault();
    let indiceTarefaAbaixo = this.listaDeTarefas.indexOf(this.tarefaAbaixo);
    let indiceTarefaArrasta = this.listaDeTarefas.indexOf(this.tarefaArrastando);
    for (let propriedade of this.tarefaArrastando.properties) {
      if (propriedade.name == this.filtroDeTarefas.name) {
        propriedade.value = filtro;
        if (indiceTarefaArrasta > indiceTarefaAbaixo) {
          this.listaDeTarefas.splice(indiceTarefaArrasta, 1);
          this.listaDeTarefas.splice(indiceTarefaAbaixo, 0, this.tarefaArrastando)
        }
        else {
          this.listaDeTarefas.splice(indiceTarefaArrasta, 1);
          this.listaDeTarefas.splice(indiceTarefaAbaixo + 1, 0, this.tarefaArrastando)
        }
      }
    }
    this.salvar();
  }


  //-------------------------------------------Usuario---------------------------------------------------

  private userId: string = 'diogo.defante';
  private users: User[] = [];
  private user: User;

  constructor(

    private userRepository: UserRepository,
    private cardPermissionsRepository: CardPermissionsRepository,
  ) {
    this.userRepository.getUsers().subscribe({
      next: (value) => {
        this.users = value
        console.log(this.users)
      }
    })
    //=======================================
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');

    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf("User=") === 0) {
        this.user = JSON.parse(cookie.substring("User=".length, cookie.length));
      }
    }
    //=========================================
  }

  //verifica se o usuario logado tem determinada permissão
  hasPermission(permission: string): boolean {
    if (this.user != undefined) {
      this.cardPermissionsRepository
      .getPropPermissionByUserId(this.user).subscribe({
        next: (value)=>{
          return value.some((cardPermissions) => {
            return cardPermissions.type === permission;
          });
        }
      });

    } else {
      return false;
    }
  }
  //-------------------------------------------Editar---------------------------------------------------

  //metodo usado para mudar uma propriedade de uma tarefa
  salvar() {
    localStorage.setItem("listaTarefas", JSON.stringify(this.listaDeTarefas))
  }


  // metodo para deletar uma tarefa
  excluirTarefas(tarefa: Task) {
    this.listaDeTarefas.splice(this.listaDeTarefas.indexOf(tarefa), 1);
    this.salvar();
  }
  //-------------------------------------------Cadastro---------------------------------------------------

  //esconde ou mostra os inputs de cadastro
  mudaCadastro() {
    this.cadastro = this.cadastro ? false : true;
  }

  //tarefa usada para cadastro
  tarefaCadastro: Task = new Task('', null)
  //variavel que faz aparecer inputs de cadastro
  cadastro: boolean = false;

  //função que cadastra uma tarefa
  cadastrarTarefa(): void {
    this.listaDeTarefas.push(new Task(this.tarefaCadastro.title, this.tarefaCadastro.properties))
    for (let propriedade of this.tarefaCadastro.properties) {
      propriedade.value = "";
    }
    this.tarefaCadastro.title = "";
    this.salvar();
  }
  //-------------------------------------------Filtros---------------------------------------------------

  filtroDeTarefas: Property;
  propriedadeFiltro: string;

  //usado para trasformar a propriedade filtro para string
  objetoParaString(objeto: Object): string {
    return JSON.stringify(objeto);
  }

  //tranforma filtro em objeto, para facilitar o codigo
  mudaFiltro(): void {
    if (this.propriedadeFiltro != undefined) {
      this.filtroDeTarefas = JSON.parse(this.propriedadeFiltro)
    }
  }

  //pegas os valores correspondentes ao filtro para separaçao em colunas
  filtrar() {
    var lista = [];
    var adicionar: boolean = true;
    if (this.filtroDeTarefas != undefined) {
      if (this.filtroDeTarefas.type != 'select') {
        for (let valor of this.valoresPossiveis()) {
          adicionar = true;
          for (let valorTeste of lista) {
            if (valor.value == valorTeste) {
              adicionar = false;
            }
          }
          if (adicionar) {
            lista.push(valor.value);
          }
        }
      }
      if (JSON.parse(this.propriedadeFiltro).type == 'text') {
        lista.sort();
        lista.reverse();
      }
      else if (JSON.parse(this.propriedadeFiltro).type == 'number') {
        lista.sort((a, b) => b - a);
      }
      else if (JSON.parse(this.propriedadeFiltro).type == 'select') {
        lista = JSON.parse(this.propriedadeFiltro).options
      }
    }
    return lista;
  }
  valoresPossiveis(): Property[] {
    let lista: Property[] = [];
    for (let tarefa of this.listaDeTarefas) {
      let adiciona: boolean = true;
      for (let prop of tarefa.properties) {
        if (prop.name == this.filtroDeTarefas.name &&
          prop.type == this.filtroDeTarefas.type) {
          for (let valor of lista) {
            adiciona = valor.value == prop.value ? false : true;
          }
        } else {
          adiciona = false;
        }
        adiciona ? lista.push(prop) : null;
      }
    }
    return lista;
  }
  //filtra as tarefas por colunas
  filtrarTarefa(valor: string) {
    let lista = [];
    if (this.propriedadeFiltro != undefined) {
      for (let tarefa of this.listaDeTarefas) {
        if (tarefa != undefined) {
          for (let propriedade of tarefa.properties) {
            if (propriedade.name == this.filtroDeTarefas.name &&
              propriedade.value == valor &&
              propriedade.type == this.filtroDeTarefas.type) {
              lista.push(tarefa);
            }
          }
        }
      }
    }
    return lista;
  }
  //verifica se determinada propriedade é do tipo 'select'
  seTipoSelecao(propriedade: Property): boolean {
    if (propriedade != undefined && propriedade.type == "select") {
      return true;
    }
    return false;
  }

  testeVisibilidade(indice: number) {
    return this.listaDePropriedade[indice].visibility
  }
}