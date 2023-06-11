import { Component, Renderer2, ElementRef, OnInit, Output, EventEmitter, ViewChild, AfterContentInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { timer } from 'rxjs';

interface Tarefa {
  texto: string,
  categoria: string,
  titulo: string
}

interface Categoria {
  nome: string,
  cor?: string
}

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit, AfterViewChecked {

  //tarefa usada para cadastro
  tarefaCadastro: Tarefa = {
    texto: "",
    categoria: "",
    titulo: ""
  }

  //lista de tarefas
  Tarefas: Tarefa[] = [];

  //variavel que faz aparecer inputs de cadastro
  cadastro: boolean = false;
  //lista de categorias
  categorias: Categoria[] = [];

  //pesquisa
  listaPesquisa: Tarefa[] = [];
  pesquisa: string = ''

  //referentes ao drag
  tarefaAbaixo: Tarefa;
  categoriaAbaixo: Categoria;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewChecked(){

    this.tamanhoTextArea();
  }

  ngOnInit() {

    //pega a lista de categorias
    if (localStorage.getItem("categorias") != null) {
      this.categorias = (JSON.parse(localStorage.getItem("categorias")));
    }
    //pega a lista de tarefas
    if (localStorage.getItem("listaTarefas") != null) {
      this.Tarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    }
  }

  //definem o tamanho das textareas para o tamanho da string interior
  tamanhoTextArea(): void {
    for (let textarea of this.el.nativeElement.querySelectorAll("textarea")) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    this.pesquisar()
  }
  @ViewChild('cadastro2') myElementRef: ElementRef;
  
  //mostra ou esconde os inputs de cadastro
  cadastrar(): void {
    if (!this.cadastro) {
      this.cadastro = true;
    } else {
      this.renderer.setStyle(this.myElementRef.nativeElement, 'animation', 'popupAnimationSair 0.3s ease-in-out');
      setTimeout(()=>{
        this.cadastro = false
      }, 250)
      this.tarefaCadastro.titulo = "";
      this.tarefaCadastro.texto = "";
      this.tarefaCadastro.categoria = "";
    }
  }

  semTituloETexto = false;
  semCat = false;

  //metodo de cadastro de tarefas
  CadastrarTarefa(): void {
    this.semCat = false;
    this.semTituloETexto = false;
    if (/^\s*$/.test(this.tarefaCadastro.titulo) && /^\s*$/.test(this.tarefaCadastro.texto)) { 
      this.semTituloETexto = true;
    } 
    if(/^\s*$/.test(this.tarefaCadastro.categoria)){
      this.semCat = true;
    }
    if ((!/^\s*$/.test(this.tarefaCadastro.titulo) || !/^\s*$/.test(this.tarefaCadastro.texto)) 
    && !/^\s*$/.test(this.tarefaCadastro.categoria)){
      const TarefaInserida: Tarefa = {
        texto: this.tarefaCadastro.texto,
        categoria: this.tarefaCadastro.categoria,
        titulo: this.tarefaCadastro.titulo
      }
      this.Tarefas.push(TarefaInserida);
      this.tarefaCadastro.texto = "";
      this.tarefaCadastro.categoria = "";
      this.tarefaCadastro.titulo = "";
      localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
    }
  }

  //metodo de pesquisar
  pesquisar(): void {
    this.listaPesquisa = [];
    for (let tarefa of this.Tarefas) {
      if ((tarefa.titulo != null && tarefa.titulo.toLowerCase().includes(this.pesquisa.toLowerCase())) ||
        (tarefa.texto != null && tarefa.texto.toLowerCase().includes(this.pesquisa.toLowerCase()))) {
        this.listaPesquisa.push(tarefa);
      }
    }
  }

  // metodo para deletar uma tarefa
  Del(indice: number) {
    this.Tarefas.splice(indice, 1);
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }

  alerta = false;

  @ViewChild('alerta') alertaElemento: ElementRef;
  fechaAlerta(){
      this.renderer.setStyle(this.alertaElemento.nativeElement, 'animation', 'popupAnimationSair 0.3s ease-in-out');
      setTimeout(() => {
          this.alerta = false
      }, 250)
  }

  //metodo que muda o conteudo de uma textarea
  muda(tarefa:Tarefa): void {
    if(/^\s*$/.test(tarefa.texto) && /^\s*$/.test(tarefa.titulo)){
      tarefa.titulo = this.antigaTarefa.titulo;
      tarefa.texto = this.antigaTarefa.texto;
      this.alerta = true;
    }
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }

  // define a tarefa abaixo do drag
  defineTarefaAbaixo(tarefa: Tarefa, event: DragEvent): void {
    this.tarefaAbaixo = tarefa;
  }

  // define a categoria abaixo do drag
  defineCategoriaAbaixo(categoria: Categoria): void {
    this.categoriaAbaixo = categoria;
  }

  // muda a categoria e a ordem da tarefa
  mudarCatDrag(tarefa: Tarefa): void {
    if (this.categoriaAbaixo.nome != "") {
      tarefa.categoria = this.categoriaAbaixo.nome;
    }
    if (this.tarefaAbaixo != null) {
      if (this.Tarefas.indexOf(tarefa) < this.Tarefas.indexOf(this.tarefaAbaixo)) {
        this.Tarefas.splice(this.Tarefas.indexOf(tarefa), 1);
        this.Tarefas.splice(this.Tarefas.indexOf(this.tarefaAbaixo) + 1, 0, tarefa);
      } else {
        this.Tarefas.splice(this.Tarefas.indexOf(tarefa), 1);
        this.Tarefas.splice((this.Tarefas.indexOf(this.tarefaAbaixo)), 0, tarefa);
      }
    }
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }

  antigaTarefa:Tarefa;
  defineAntigaTarefa(tarefa:Tarefa){
    this.antigaTarefa = {titulo:tarefa.titulo, texto:tarefa.texto, categoria:tarefa.categoria}
  }

  //muda o indicador de bloqueio do drag 
  mudaBloqueio(event: any): void {
    event.preventDefault();
  }
}