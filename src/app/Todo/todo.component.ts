import { Component, Renderer2, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

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

export class TodoComponent implements OnInit {

  tarefa: Tarefa = {
    texto: "",
    categoria: "",
    titulo: ""
  }

  Tarefas: Tarefa[] = [];

  @Output()
  mudarTema = new EventEmitter

  mudaTema(): void {
    this.mudarTema.emit();
  }
  cadastro: boolean = false;
  adicione: boolean = false;
  categorias: Categoria[] = [];
  listaPesquisa: Tarefa[] = [];
  pesquisa: string = ''

  ngOnInit() {

    if (localStorage.getItem("categorias") != null) {
      this.categorias = (JSON.parse(localStorage.getItem("categorias")));
    }
    if (localStorage.getItem("listaTarefas") != null) {
      this.Tarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    }
  }

  contraste(cor: string): string {
    const r = parseInt(String(cor).substr(1, 2), 16);
    const g = parseInt(String(cor).substr(3, 2), 16);
    const b = parseInt(String(cor).substr(5, 2), 16);
    const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luz > 128 ? '#000' : '#fff'
  }

  tamanhoTextArea(): void {
    for (let textarea of this.el.nativeElement.querySelectorAll("textarea")) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    this.pesquisar()
  }

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  proFinal(): void {
    const div = this.el.nativeElement.querySelector('#scrollBar');
    div.scrollLeft = div.scrollWidth;
  }

  cadastrar(): void {
    if (!this.cadastro) {
      this.cadastro = true;
    } else {
      this.cadastro = false;
    }
  }

  CadastrarTarefa(): void {
    if (this.tarefa.titulo == "" && this.tarefa.texto == "" || this.tarefa.categoria == "") { }
    else {
      const TarefaInserida: Tarefa = {
        texto: this.tarefa.texto,
        categoria: this.tarefa.categoria,
        titulo: this.tarefa.titulo
      }
      this.Tarefas.push(TarefaInserida);
      this.tarefa.texto = "";
      this.tarefa.categoria = "";
      this.tarefa.titulo = "";
      localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
      this.cadastro = false
    }
  }

  pesquisar(): void {
    this.listaPesquisa = [];
    for (let tarefa of this.Tarefas) {
      if ((tarefa.titulo != null && tarefa.titulo.toLowerCase().includes(this.pesquisa.toLowerCase())) ||
        (tarefa.texto != null && tarefa.texto.toLowerCase().includes(this.pesquisa.toLowerCase()))) {
        this.listaPesquisa.push(tarefa);
      }
    }
  }

  Del(indice: number) {
    this.Tarefas.splice(indice, 1);
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }
  muda(): void {

    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }

}