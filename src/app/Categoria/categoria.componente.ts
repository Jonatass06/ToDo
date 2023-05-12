import { Component } from "@angular/core";

interface Categoria{
    nome: string,
    cor?:string
}

@Component({
    templateUrl: './categoria.component.html',
    styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent{

    categorias:Categoria[] = [];
    categoriaNome:string ='';
    categoriaCor:string ='rgba(144, 0, 240, 0.863)';

    ngOnInit(){

        if (localStorage.getItem("categorias") != null) {
          this.categorias = (JSON.parse(localStorage.getItem("categorias")));
        }
    }

    delCat(indice:number){
        this.categorias.splice(indice, 1);
        localStorage.setItem("categorias", JSON.stringify(this.categorias));
      }

    cadastrarCat():void{
    let permissao = true;
        for(let cat of this.categorias){
            if(cat.nome == this.categoriaNome){
                permissao = false;
            }
        }
    if(this.categoriaNome!="" && permissao){
        
        let categoriaParaCadastro:Categoria= {nome: this.categoriaNome};
        if(this.categoriaCor!=""){
            categoriaParaCadastro = {nome: this.categoriaNome, cor: this.categoriaCor};
        }
        this.categorias.push(categoriaParaCadastro);
        localStorage.setItem('categorias', JSON.stringify(this.categorias));
        this.categoriaNome = '';
        this.categoriaCor = 'purple'
    } else if(!permissao){
        alert("Você já cadastrou uma tarefa com esse nome e essa cor!")
    }
}
cancelar():void{
    this.categoriaNome = '';
    this.categoriaCor = ''
  }
}