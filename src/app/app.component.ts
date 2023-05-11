import { Component, Renderer2,ElementRef, OnInit } from '@angular/core';

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

export class AppComponent implements OnInit{

  Tarefas: Tarefa[];
  categorias:object[];
  categoriaCadastro:string;

  corTexto:string;
  tema:string;
  adicione:boolean = false;

  ngOnInit(){

    this.categorias = [{texto:"To Do"}, {texto:"Doing"}, {texto:"Done"}];
    if (localStorage.getItem("categorias") != null) {
      this.categorias = (JSON.parse(localStorage.getItem("categorias")));
    }

    this.Tarefas = [];
    if (localStorage.getItem("listaTarefas") != null) {
      this.Tarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    }

    this.tema = "White";
    if (localStorage.getItem("tema") != null) {
      this.tema = localStorage.getItem("tema");
    }

    this.mudaTema();
  }

  tarefa: Tarefa = {
    texto: null,
    categoria: null,
    titulo: null
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  cadastrarCat():void{
    if(this.categoriaCadastro!=null && this.categoriaCadastro!=""){
      const categoriaParaCadastro = {texto:this.categoriaCadastro};
      this.categorias.push(categoriaParaCadastro);
      localStorage.setItem('categorias', JSON.stringify(this.categorias));
      this.cancelar();
    }
  }



  proFinal():void{
    const div = this.el.nativeElement.querySelector('#scrollBar');
    div.scrollLeft = div.scrollWidth;
  }
  
  cancelar():void{
    this.adicione=false;
    this.categoriaCadastro = null;
  }

  mudaTema():void {
    if(this.tema == "White"){
      this.corTexto = 'Black';
    } else{
      this.corTexto= "White";
    }
    document.body.style.backgroundColor = this.tema;
    localStorage.setItem("tema", this.tema);
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

  delCat(indice:number){
    this.categorias.splice(indice, 1);
    localStorage.setItem("categorias", JSON.stringify(this.categorias));
    this.cancelar();
  }
}
