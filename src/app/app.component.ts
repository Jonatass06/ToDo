import { Component } from '@angular/core';

interface Tarefa{
  texto:string,
  categoria:string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  defineLista():Tarefa[]{
    let Tarefas:Tarefa[] = [];
    if(localStorage.getItem("listaTarefas") != null){
       Tarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    }
    return Tarefas;
  }
  Tarefas:Tarefa[] = this.defineLista();

  title = 'todo-app';
  
  tarefa:Tarefa ={
    texto: null,
    categoria:null
  }
  CadastrarTarefa():void{
    if(this.tarefa.categoria == null){
      this.tarefa.categoria = "To Do"
    }
    const TarefaInserida: Tarefa = {
      texto: this.tarefa.texto,
      categoria: this.tarefa.categoria
    }
    this.Tarefas.push(TarefaInserida);
    this.tarefa.texto = null;
    this.tarefa.categoria = null;
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }
  Del(item:any){
    const index = this.Tarefas.indexOf(item);
    this.Tarefas.splice(index, 1);
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));

 }
 mudaCat():void{
  localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
 }
}
