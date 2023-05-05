import { Component } from '@angular/core';

interface Tarefa {
  texto: string,
  categoria: string,
  titulo: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  defineLista(): Tarefa[] {
    let Tarefas: Tarefa[] = [];
    if (localStorage.getItem("listaTarefas") != null) {
      Tarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    }
    return Tarefas;
  }
  Tarefas: Tarefa[] = this.defineLista();

  title = 'todo-app';

  tarefa: Tarefa = {
    texto: null,
    categoria: null,
    titulo: null
  }

  corTexto = 'Black';
  tema = "White"

  mudaTema():void{
    if(this.tema == "White"){
      this.corTexto = 'Black';
    } else{
      this.corTexto = 'White';
    }
  }

  CadastrarTarefa(): void {
    if ((this.tarefa.titulo == null && this.tarefa.texto == null) ||
    (this.tarefa.titulo == null && this.tarefa.texto == "")||
    (this.tarefa.titulo == "" && this.tarefa.texto == null)||
    (this.tarefa.titulo == "" && this.tarefa.texto == "")) {}
    else{
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
