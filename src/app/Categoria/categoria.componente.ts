import { Component, ElementRef, Renderer2 } from "@angular/core";

interface Categoria {
    nome: string,
    cor?: string
}

@Component({
    templateUrl: './categoria.component.html',
    styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent {

    cadastro: boolean = false;
    listaPesquisa: Categoria[] = [];
    pesquisa: string = ''
    categorias: Categoria[] = [];
    categoriaNome: string = '';
    categoriaCor: string = 'rgba(144, 0, 240, 0.863)';


    contraste(cor: string): string {
        const r = parseInt(cor.substr(1, 2), 16)
        const g = parseInt(cor.substr(3, 2), 16)
        const b = parseInt(cor.substr(5, 2), 16)
        const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
        return luz > 128 ? '#000' : '#fff'
    }
    cadastrar(): void {
        if (!this.cadastro) {
            this.cadastro = true;
        } else {
            this.cadastro = false;
        }
    }

    pesquisar(): void {
        this.listaPesquisa = [];
        for (let tarefa of this.categorias) {
            if ((tarefa.nome != null && tarefa.nome.toLowerCase().includes(this.pesquisa.toLowerCase()))) {
                this.listaPesquisa.push(tarefa);
            }
        }
    }

    ngOnInit() {

        if (localStorage.getItem("categorias") != null) {
            this.categorias = (JSON.parse(localStorage.getItem("categorias")));
        }
    }

    delCat(indice: number) {
        let categoriaExcluir = this.categorias[indice].nome;
        this.categorias.splice(indice, 1);
        let listaTarefas = [];

        if(localStorage.getItem("listaTarefas")){
            listaTarefas = JSON.parse(localStorage.getItem("listaTarefas"))
        }

        for(let tarefa of listaTarefas){
            if(tarefa.categoria == categoriaExcluir){
                listaTarefas.splice(listaTarefas.indexOf(tarefa), 1)
            }
        }
        localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
        localStorage.setItem("categorias", JSON.stringify(this.categorias));
    }

    cadastrarCat(): void {
        let permissao = true;
        for (let cat of this.categorias) {
            if (cat.nome == this.categoriaNome) {
                permissao = false;
            }
        }
        if (this.categoriaNome != "" && permissao) {

            let categoriaParaCadastro: Categoria = { nome: this.categoriaNome };
            if (this.categoriaCor != "") {
                categoriaParaCadastro = { nome: this.categoriaNome, cor: this.categoriaCor };
            }
            this.categorias.push(categoriaParaCadastro);
            localStorage.setItem('categorias', JSON.stringify(this.categorias));
            this.categoriaNome = '';
            this.categoriaCor = 'purple'
        } else if (!permissao) {
            alert("Você já cadastrou uma tarefa com esse nome e essa cor!")
        }
    }
    muda(): void {
        localStorage.setItem('categorias', JSON.stringify(this.categorias));
    }
    constructor(private renderer: Renderer2, private el: ElementRef) { }
    tamanhoTextArea(): void {
        for (let textarea of this.el.nativeElement.querySelectorAll("textarea")) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
        this.pesquisar()
    }
}