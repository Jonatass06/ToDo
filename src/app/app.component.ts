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
  title = 'todo-app';

  mostraInput: boolean = true;
  
  Tarefas:Tarefa[] = [];

  tarefa:Tarefa ={
    texto: "",
    categoria:""
  }
  CadastrarTarefa():void{
    const TarefaInserida: Tarefa = {
      texto: this.tarefa.texto,
      categoria: this.tarefa.categoria
    }
    this.Tarefas.push(TarefaInserida);
    this.tarefa.texto = null;
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }
  Del(item){
    const index = this.Tarefas.indexOf(item);
    this.Tarefas.splice(index, 1);
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));

 }
 defineCategoria(indice, selected):void{
    this.Tarefas[indice].categoria = selected;
 }

}
