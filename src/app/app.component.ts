/* - tirar categorias que nao tem tarefas pesquisadas
- ajeitar o problema de recarregar pagina de pesquisa********
- destaque na pésquisa usar contenteditable
- ajeitar temas e cor do app
- ajeitar metodos chamados diretos no html
- tirar logica do html
- ajeitar prolema de trocar categorias e taraefas para espaco vazio, inclusive em pesquisa
*/

import { Component, OnInit, ElementRef, Output, EventEmitter, ViewChild, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PesquisaComponent } from './Pesquisa/pesquisa.component';

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

  constructor(private el: ElementRef, private router: Router, private renderer: Renderer2) { }

  @ViewChild('secao') myElementRef: ElementRef;
  //faz o menu aparecer ou desaparecer
  menu(): void {
    if (this.secao) {
      this.renderer.setStyle(this.myElementRef.nativeElement, 'animation', 'desaparece 0.3s ease-in-out');
      setTimeout(()=>{
        this.secao = false
      }, 250)
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
      document.documentElement.style.setProperty('--cor-fundo', "0,0,0")
      document.documentElement.style.setProperty('--cor-contraste', this.contraste(document.documentElement.style.getPropertyValue('--cor-app')))
      document.documentElement.style.setProperty('--cor-texto', '255, 255, 255')
      document.documentElement.style.setProperty('--cor-app', '189, 70, 255, 0.863')
    } else {
      document.documentElement.style.setProperty('--cor-fundo', "255,255,255")
      document.documentElement.style.setProperty('--cor-contraste', this.contraste(document.documentElement.style.getPropertyValue('--cor-app')))
      document.documentElement.style.setProperty('--cor-texto', '0,0,0')
      document.documentElement.style.setProperty('--cor-app', '144, 0, 240, 0.863')
    }
    localStorage.setItem("tema", this.tema);
  }

  limpaPesquisa():void{
    this.pesquisa='';
  }

  //serve para definir a cor de texto contrastante com a de fundo
  contraste(cor: string): string {
    const r = parseInt(String(cor).substr(1, 2), 16);
    const g = parseInt(String(cor).substr(3, 2), 16);
    const b = parseInt(String(cor).substr(5, 2), 16);
    const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luz > 128 ? '#000' : '#fff'
  }

  //para a pesquisa e volta para a pagina anterior
  parouPesquisa(): void {
    if (this.pesquisa == "") {
      this.router.navigate([localStorage.getItem("paginaAberta")])
    }
  }

  @ViewChild(RouterOutlet) routerOutlet: RouterOutlet;
  //metodo que define pesquisa no componente pesquisa
  pesquisar() {
    if (this.routerOutlet && this.routerOutlet.component) {
      const componenteFilho = this.routerOutlet.component as PesquisaComponent;
      componenteFilho.definePesquisa(this.pesquisa);
    }
  }
  //muda a pagina para a pagina de pesquisa
  mudaPagina():void{
    if (!this.router.url.includes("/pesquisa")) {
      localStorage.setItem("paginaAberta", this.router.url)
    }
    this.router.navigate(["/pesquisa"]);
  }
}
