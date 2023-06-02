import { Component, OnInit , ElementRef } from '@angular/core';


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

  constructor(private el: ElementRef) { }

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
}
