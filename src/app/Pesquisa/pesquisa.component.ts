import { Component, Renderer2, ElementRef, OnInit, Output, EventEmitter, Input, OnDestroy, AfterViewChecked, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})

export class PesquisaComponent implements OnInit, AfterViewChecked {
  //lista de tarefas
  Tarefas: Tarefa[] = [];
  //lista de categorias
  categorias: Categoria[] = [];
  //lista de  --- mudar para logica apenas
  pesquisas: any[] = JSON.parse(localStorage.getItem("listaPesquisa"));
  //tarefa abaixo do drag
  tarefaAbaixo: Tarefa;
  // categoria abaixo do drag
  categoriaAbaixo: Categoria;
  //pagina anterior a pagina de pesquisa
  paginaAnterior: string;
  //tarefa e categoria antes da alteracao pelo textarea
  antigaTarefa: Tarefa;
  antigaCategoria: Categoria;
  pesquisa
  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) { }

  //pega a lista de tarefas, categorias e pesquisa
  ngOnInit() {
    if (localStorage.getItem("categorias") != null) {
      this.categorias = (JSON.parse(localStorage.getItem("categorias")));
    }
    if (localStorage.getItem("listaTarefas") != null) {
      this.Tarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    }
    this.paginaAnterior = localStorage.getItem("paginaAberta")
 }

  //define a palavra pesquisada
  definePesquisa(pesquisa: string): void {
    this.pesquisa = pesquisa;
  }

  //define o tamanho do textarea como o minimo para o texto
  tamanhoTextArea(): void {
    for (let textarea of this.el.nativeElement.querySelectorAll("textarea")) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  //teste se a tarefa esta sendo pesquisada
  testeTarefa(tarefa: Tarefa, categoria: Categoria): boolean {
    console.log(this.pesquisa)
    if (tarefa.categoria == categoria.nome &&
      (tarefa.titulo.includes(this.pesquisa) ||
        tarefa.texto.includes(this.pesquisa))) {
      return true
    }
    return false
  }
  //teste se a categoria esta sendo pesquisada
  testeCategoria(cat: Categoria): boolean {
    if (cat.nome.includes(this.pesquisa)) {
      return true;
    }
    return false;
  }

  //define a tarefa antes de altera-la
  defineAntigaTarefa(tarefa: Tarefa, event: Event): void {
    this.antigaTarefa = { texto: tarefa.texto, categoria: tarefa.categoria, titulo: tarefa.titulo };
    const targetElement = event.target as HTMLInputElement;
    targetElement.disabled = false;
  }

  ngAfterViewChecked(){

    this.tamanhoTextArea();
  }

  // metodo para deletar uma tarefa
  Del(indice: number) {
    this.Tarefas.splice(indice, 1);
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }


  mudaCor():void{
    localStorage.setItem('categorias', JSON.stringify(this.categorias));
}

  //metodo que muda o conteudo de uma textarea
  muda(): void {
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

  //define categoria antes de altera-la
  defineAntigaCategoria(categoria: Categoria): void {
    this.antigaCategoria = { nome: categoria.nome, cor: categoria.cor };
  }
  //muda o nome da categoria
  alerta1 = false;
  alerta2 = false;
  mudaCat(indice: number): void {
      if(this.categorias[indice].nome != this.antigaCategoria.nome){
          for(let cat of this.categorias){
              if(cat != this.categorias[indice]){
                  if(this.categorias[indice].nome == cat.nome){
                      this.categorias[indice].nome = this.antigaCategoria.nome;
                      this.alerta1=true;
                  }
              }
          }
      }
      if(/^\s*$/.test(this.categorias[indice].nome)){
          this.categorias[indice].nome = this.antigaCategoria.nome;
          this.alerta2=true;
      }
              
      let tarefas: Tarefa[];
      if (localStorage.getItem("listaTarefas") != null) {
          tarefas = (JSON.parse(localStorage.getItem("listaTarefas")));
      }
      for (let tarefa of tarefas) {
          if (tarefa.categoria == this.antigaCategoria.nome) {
              tarefa.categoria = this.categorias[indice].nome;
          }
      }
      localStorage.setItem('categorias', JSON.stringify(this.categorias));
      localStorage.setItem('listaTarefas', JSON.stringify(tarefas))
  }

  @ViewChild('alerta2') alertaElemento: ElementRef;
  fechaAlerta(){
      this.renderer.setStyle(this.alertaElemento.nativeElement, 'animation', 'popupAnimationSair 0.3s ease-in-out');
      setTimeout(() => {
          this.alerta1 = false
          this.alerta2 = false
      }, 250)
  }


  //deleta categoria e as tarefas com aquela categoria
  delCat(indice: number) {
    let tarefas: any[];
    if (localStorage.getItem("listaTarefas") != null) {
      tarefas = (JSON.parse(localStorage.getItem("listaTarefas")));
    }
    for (let tarefa of tarefas) {
      if (tarefa.categoria == this.categorias[indice].nome) {
        tarefas.splice(tarefas.indexOf(tarefa));
      }
    }
    this.categorias.splice(indice, 1);
    localStorage.setItem("categorias", JSON.stringify(this.categorias));
    localStorage.setItem("listaTarefas", JSON.stringify(tarefas));
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

  //muda o indicador de bloqueio do drag 
  mudaBloqueio(event: any): void {
    event.preventDefault();
  }
}