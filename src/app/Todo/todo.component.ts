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

  Tarefas: Tarefa[];

  @Output()
  mudarTema = new EventEmitter

  mudaTema(): void {
    this.mudarTema.emit();
  }
  adicione: boolean = false;
  categorias: Categoria[] = [];

  ngOnInit() {

    if (localStorage.getItem("categorias") != null) {
      this.categorias = (JSON.parse(localStorage.getItem("categorias")));
    }

    this.Tarefas = [];
    if (localStorage.getItem("listaTarefas") != null) {
      this.Tarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    }
  }

  tarefa: Tarefa = {
    texto: null,
    categoria: null,
    titulo: null
  }

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  proFinal(): void {
    const div = this.el.nativeElement.querySelector('#scrollBar');
    div.scrollLeft = div.scrollWidth;
  }





  CadastrarTarefa(): void {
    if ((this.tarefa.titulo == null && this.tarefa.texto == null) ||
      (this.tarefa.titulo == null && this.tarefa.texto == "") ||
      (this.tarefa.titulo == "" && this.tarefa.texto == null) ||
      (this.tarefa.titulo == "" && this.tarefa.texto == "")) { }
    else {
      if (this.tarefa.categoria == null) {
        this.tarefa.categoria = "To Do"
      }
      const TarefaInserida: Tarefa = {
        texto: this.tarefa.texto,
        categoria: this.tarefa.categoria,
        titulo: this.tarefa.titulo
      }
      this.Tarefas.push(TarefaInserida);
      this.tarefa.texto = null;
      this.tarefa.categoria = null;
      this.tarefa.titulo = null;
      localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
    }
  }

  Del(indice: number) {
    this.Tarefas.splice(indice, 1);
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }
  mudaCat(): void {
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }


}