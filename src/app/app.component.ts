import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  secao: boolean = true;
  tema: string;
  corTexto: string;
  constructor(private renderer: Renderer2, private el: ElementRef, private route: ActivatedRoute) { }

  menu(): void {
    if (this.secao) {
      this.secao = false;
    } else {
      this.secao = true;
    }
  }


  ngOnInit(): void {
    this.tema = "White";
    if (localStorage.getItem("tema") != null) {
      this.tema = localStorage.getItem("tema");
    }
    this.mudaTema();

  }

  mudaTema(): void {

    document.documentElement.style.setProperty('--cor-fundo', this.tema)
    if (this.tema == 'Black') {
      document.documentElement.style.setProperty('--cor-texto', 'White')
      document.documentElement.style.setProperty('--cor-app', 'rgba(189, 70, 255, 0.863)')
    } else {
      document.documentElement.style.setProperty('--cor-texto', 'Black')
      document.documentElement.style.setProperty('--cor-app', 'rgba(144, 0, 240, 0.863)')
    }


    localStorage.setItem("tema", this.tema);
  }

}
