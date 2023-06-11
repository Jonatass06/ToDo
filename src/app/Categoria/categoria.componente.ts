import { AfterViewChecked, Component, ElementRef, Renderer2, ViewChild } from "@angular/core";

interface Categoria {
    nome: string,
    cor?: string
}

interface Tarefa {
    texto: string,
    categoria: string,
    titulo: string
}

@Component({
    templateUrl: './categoria.component.html',
    styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements AfterViewChecked  {

    //aparece barra de cadastro ou não
    cadastro: boolean = false;
    //referentes a pesquisa de categorias
    listaPesquisa: Categoria[] = [];
    pesquisa: string = ''
    //referentes ao cadastro e persistencia de novas categorias
    categorias: Categoria[] = [];
    categoriaNome: string = '';
    categoriaCor: string = 'purple';
    antigaCategoria: Categoria;

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    //define o contraste da cor do texto e do fundo
    contraste(cor: string): string {
        const r = parseInt(cor.substr(1, 2), 16)
        const g = parseInt(cor.substr(3, 2), 16)
        const b = parseInt(cor.substr(5, 2), 16)
        const luz = 0.2126 * r + 0.7152 * g + 0.0722 * b
        return luz > 128 ? '#000' : '#fff'
    }

    @ViewChild('cadastro2') cadastroElemento: ElementRef;
    //mostra a barra de cadastro
    cadastrar(): void {
        if (!this.cadastro) {
            this.cadastro = true;
        } else {
            this.renderer.setStyle(this.cadastroElemento.nativeElement, 'animation', 'popupAnimationSair 0.3s ease-in-out');
            setTimeout(() => {
                this.cadastro = false
            }, 250)
            this.categoriaCor = "purple";
            this.categoriaNome = ""
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
        let tarefas: any[];
        if (localStorage.getItem("listaTarefas") != null) {
            tarefas = (JSON.parse(localStorage.getItem("listaTarefas")));
        }
        for (let tarefa of tarefas) {
            if (tarefa.categoria == this.categorias[indice].nome) {
                tarefas.splice(tarefas.indexOf(tarefa));
            }
        }
        this.categorias.splice(indice, 1);
        localStorage.setItem("categorias", JSON.stringify(this.categorias));
        localStorage.setItem("listaTarefas", JSON.stringify(tarefas));
    }

    permissao = true;
    vazio = false;
    //cadastra categoria
    cadastrarCat(): void {
        this.permissao = true;
        this.vazio = false;
        for (let cat of this.categorias) {
            if (cat.nome == this.categoriaNome) {
                this.permissao = false;
            }
        }
        if (this.categoriaNome != "" && this.permissao) {
            let categoriaParaCadastro: Categoria = { nome: this.categoriaNome };
            categoriaParaCadastro = { nome: this.categoriaNome, cor: this.categoriaCor };
            this.categorias.push(categoriaParaCadastro);
            localStorage.setItem('categorias', JSON.stringify(this.categorias));
            this.categoriaNome = '';
            this.categoriaCor = 'purple'
        }
        if(this.categoriaNome == ""){
            this.vazio = true;
        }
    }

    defineAntigaCategoria(categoria: Categoria): void {
        this.antigaCategoria = { nome: categoria.nome, cor: categoria.cor };
    }
    //muda o nome da categoria
    alerta1 = false;
    alerta2 = false;
    muda(indice: number): void {
        if(this.categorias[indice].nome != this.antigaCategoria.nome){
            for(let cat of this.categorias){
                if(cat != this.categorias[indice]){
                    if(this.categorias[indice].nome == cat.nome){
                        this.categorias[indice].nome = this.antigaCategoria.nome;
                        this.alerta1=true;
                    }
                }
            }
        }
        if(/^\s*$/.test(this.categorias[indice].nome)){
            this.categorias[indice].nome = this.antigaCategoria.nome;
            this.alerta2=true;
        }
                
        let tarefas: Tarefa[];
        if (localStorage.getItem("listaTarefas") != null) {
            tarefas = (JSON.parse(localStorage.getItem("listaTarefas")));
        }
        for (let tarefa of tarefas) {
            if (tarefa.categoria == this.antigaCategoria.nome) {
                tarefa.categoria = this.categorias[indice].nome;
            }
        }
        localStorage.setItem('categorias', JSON.stringify(this.categorias));
        localStorage.setItem('listaTarefas', JSON.stringify(tarefas))

    }

    mudaCor():void{
        localStorage.setItem('categorias', JSON.stringify(this.categorias));
    }

    @ViewChild('alerta2') alertaElemento: ElementRef;
    fechaAlerta(){
        this.renderer.setStyle(this.alertaElemento.nativeElement, 'animation', 'popupAnimationSair 0.3s ease-in-out');
        setTimeout(() => {
            this.alerta1 = false
            this.alerta2 = false
        }, 250)
    }

    ngAfterViewChecked(){

        this.tamanhoTextArea();
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