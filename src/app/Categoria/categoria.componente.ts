import { Component, ElementRef } from "@angular/core";

interface Categoria {
    nome: string,
    cor?: string
}

@Component({
    templateUrl: './categoria.component.html',
    styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent {

    //aparece barra de cadastro ou não
    cadastro: boolean = false;
    //referentes a pesquisa de categorias
    listaPesquisa: Categoria[] = [];
    pesquisa: string = ''
    //referentes ao cadastro e persistencia de novas categorias
    categorias: Categoria[] = [];
    categoriaNome: string = '';
    categoriaCor: string = 'purple';

    constructor(private el: ElementRef) { }

    //define o contraste da cor do texto e do fundo
    contraste(cor: string): string {
        const r = parseInt(cor.substr(1, 2), 16)
        const g = parseInt(cor.substr(3, 2), 16)
        const b = parseInt(cor.substr(5, 2), 16)
        const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
        return luz > 128 ? '#000' : '#fff'
    }

    //mostra a barra de cadastro
    cadastrar(): void {
        if (!this.cadastro) {
            this.cadastro = true;
        } else {
            this.cadastro = false;
        }
    }

    //pesquisa as categorias existentes
    pesquisar(): void {
        this.listaPesquisa = [];
        for (let categoria of this.categorias) {
            if ((categoria.nome != null && categoria.nome.toLowerCase().includes(this.pesquisa.toLowerCase()))) {
                this.listaPesquisa.push(categoria);
            }
        }
    }

    //pega a lista de categorias
    ngOnInit() {

        if (localStorage.getItem("categorias") != null) {
            this.categorias = (JSON.parse(localStorage.getItem("categorias")));
        }
    }

    //deleta categoria e as tarefas com aquela categoria
    delCat(indice: number) {
        let tarefas:any[];
        if (localStorage.getItem("listaTarefas") != null) {
            tarefas = (JSON.parse(localStorage.getItem("listaTarefas")));
        }
        for(let tarefa of tarefas){
            if(tarefa.categoria == this.categorias[indice].nome){
                tarefas.splice(tarefas.indexOf(tarefa));
            }
        }
        this.categorias.splice(indice, 1);
        localStorage.setItem("categorias", JSON.stringify(this.categorias));
        localStorage.setItem("listaTarefas", JSON.stringify(tarefas));
    }

    //cadastra categoria
    cadastrarCat(): void {
        let permissao = true;
        for (let cat of this.categorias) {
            if (cat.nome == this.categoriaNome) {
                permissao = false;
            }
        }
        if (this.categoriaNome != "" && permissao) {
            let categoriaParaCadastro: Categoria = { nome: this.categoriaNome };
            categoriaParaCadastro = { nome: this.categoriaNome, cor: this.categoriaCor };
            this.categorias.push(categoriaParaCadastro);
            localStorage.setItem('categorias', JSON.stringify(this.categorias));
            this.categoriaNome = '';
            this.categoriaCor = 'purple'
        } else if (!permissao) {
            alert("Você já cadastrou uma tarefa com esse nome e essa cor!")
        }
    }

    //muda o nome da categoria
    muda(indice:number): void {
        localStorage.setItem('categorias', JSON.stringify(this.categorias));
    }

    //define a altura de todos os textarea
    tamanhoTextArea(): void {
        for (let textarea of this.el.nativeElement.querySelectorAll("textarea")) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
        this.pesquisar()
    }
}