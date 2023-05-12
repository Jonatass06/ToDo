import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  tema:string;
  corTexto:string;

  ngOnInit(): void {
    this.tema = "White";
    if (localStorage.getItem("tema") != null) {
      this.tema = localStorage.getItem("tema");
    }

    this.mudaTema();
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

}
