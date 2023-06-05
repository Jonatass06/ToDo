/* - Ajeitar problema com pesquisa e alteracao de dados junto ao drag and drop
- ajeitar problema de pesquisa com apenas a primeira letra
- ajeitar o routerlinkactive
- input para cadastro que deixa tudo sem foco
- adicionar input de cor para mudar a cor de uma categoria
- ajeitar temas e cor do app
- mudar o input do componente pesquisa para a pesquisa ao inves da lista de pesquisa
- nao deixar modificar para categoria que ja existe
- ajeitar metodos chamados diretos no html
- tirar logica do html
*/

import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  //faz aparecer o menu lateral
  secao: boolean = true;
  //muda o tema do site
  tema: string;
  corTexto: string;
  //pesquisa
  pesquisa: string = '';
  listaPesquisa: any[] = [];

  constructor(private el: ElementRef, private router: Router) { }

  //faz o menu aparecer ou desaparecer
  menu(): void {
    if (this.secao) {
      this.secao = false;
    } else {
      this.secao = true;
    }
  }

  // pega o tema do localStorage
  ngOnInit(): void {
    this.tema = "White";
    if (localStorage.getItem("tema") != null) {
      this.tema = localStorage.getItem("tema");
    }
    this.mudaTema();
  }

  //muda o tema de light para dark
  mudaTema(): void {

    if (this.tema == 'Dark') {
      document.documentElement.style.setProperty('--cor-fundo', "rgba(0,0,0,0.95")
      document.documentElement.style.setProperty('--cor-contraste', this.contraste(document.documentElement.style.getPropertyValue('--cor-app')))
      document.documentElement.style.setProperty('--cor-texto', 'White')
      document.documentElement.style.setProperty('--cor-app', 'rgba(189, 70, 255, 0.863)')
    } else {
      document.documentElement.style.setProperty('--cor-fundo', "White")
      document.documentElement.style.setProperty('--cor-contraste', this.contraste(document.documentElement.style.getPropertyValue('--cor-app')))
      document.documentElement.style.setProperty('--cor-texto', 'Black')
      document.documentElement.style.setProperty('--cor-app', 'rgba(144, 0, 240, 0.863)')
    }
    localStorage.setItem("tema", this.tema);
  }

  //serve para definir a cor de texto contrastante com a de fundo
  contraste(cor: string): string {
    const r = parseInt(String(cor).substr(1, 2), 16);
    const g = parseInt(String(cor).substr(3, 2), 16);
    const b = parseInt(String(cor).substr(5, 2), 16);
    const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luz > 128 ? '#000' : '#fff'
  }

  //muda a url para pesquisa e já salva a pagina 
  pesquisando(): void {
    if (!this.router.url.includes("/pesquisa")) {
      localStorage.setItem("paginaAberta", this.router.url)
    }

    //pesquisa de tarefas
    if (this.router.url == "/tarefas") {
      let Tarefas: Tarefa[] = [];
      if (localStorage.getItem("listaTarefas") != null) {
        Tarefas = JSON.parse(localStorage.getItem("listaTarefas"));
      }
      this.listaPesquisa = [];
      for (let tarefa of Tarefas) {
        if ((tarefa.titulo != null && tarefa.titulo.toLowerCase().includes(this.pesquisa.toLowerCase())) ||
          (tarefa.texto != null && tarefa.texto.toLowerCase().includes(this.pesquisa.toLowerCase()))) {
          this.listaPesquisa.push(tarefa);
        }
      }
    }

    //pesquisa de categorias
    else if (this.router.url == "/categoria") {
      let categorias: Categoria[] = [];
      if (localStorage.getItem("categorias") != null) {
        categorias = JSON.parse(localStorage.getItem("categorias"));
      }
      this.listaPesquisa = [];
      for (let categoria of categorias) {
        if (categoria.nome.includes(this.pesquisa)) {
          this.listaPesquisa.push(categoria);
        }
      }
    }

    this.router.navigate(["/pesquisa"]);
    localStorage.setItem("listaPesquisa", JSON.stringify(this.listaPesquisa))
  }

  //para a pesquisa e volta para a pagina anterior
  parouPesquisa(): void {
    if (this.pesquisa == "") {
      this.router.navigate([localStorage.getItem("paginaAberta")])
    }
  }
}
