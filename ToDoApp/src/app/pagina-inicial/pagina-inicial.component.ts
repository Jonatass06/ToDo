/* - tirar categorias que nao tem tarefas pesquisadas
- ajeitar o problema de recarregar pagina de pesquisa********
- destaque na pésquisa usar contenteditable
- ajeitar temas e cor do app
- ajeitar metodos chamados diretos no html
- tirar logica do html
- ajeitar prolema de trocar categorias e taraefas para espaco vazio, inclusive em pesquisa
*/
/*
-------cor propriedade
-------titulo ser propriedade obrigatoria
-------mensagens de erro
*/

import { Component, OnInit, ElementRef, Output, EventEmitter, ViewChild, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserRepository } from 'src/repositories/user.repository';
import { User } from 'src/models/users/user';

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
  selector: 'pagina-inicial-app',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})

export class PaginaInicialComponent implements OnInit {
  
  //faz aparecer o menu lateral
  secao: boolean = true;
  //muda o tema do site
  tema: string;
  corTexto: string;
  //pesquisa
  pesquisa: string = '';

  todo:boolean;
  property:boolean;

 constructor(private router: Router, private renderer: Renderer2)
 {}


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
      document.documentElement.style.setProperty('--cor-app', '189, 70, 255')
    } else {
      document.documentElement.style.setProperty('--cor-fundo', "255,255,255")
      document.documentElement.style.setProperty('--cor-contraste', this.contraste(document.documentElement.style.getPropertyValue('--cor-app')))
      document.documentElement.style.setProperty('--cor-texto', '0,0,0')
      document.documentElement.style.setProperty('--cor-app', '144, 0, 240')
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

  goingTodo():void{
    this.property = false;    
    this.todo = true;
  }
  goingProperty():void{
    this.todo = false;
    this.property = true;    
  }
}
