import { Component, Renderer2, ElementRef, OnInit, Output, EventEmitter, ViewChild, AfterContentInit, AfterViewInit, AfterViewChecked } from '@angular/core';

interface Categoria {
  nome: string,
  cor?: string
}

//Propriedade----------------------------------------------------------------------------------
interface Propriedade {
  nome: string,
  tipo: string,
  opcoes?: string[]
}
//Propriedade----------------------------------------------------------------------------------
interface Tarefa {
  categoria: string,
  titulo: string,
  propriedades: any[]
}

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit, AfterViewChecked {

  //tarefa usada para cadastro
  tarefaCadastro: Tarefa = {
    categoria: "",
    titulo: "",
    propriedades: []
  }

  //lista de tarefas
  Tarefas: Tarefa[] = [];

  //variavel que faz aparecer inputs de cadastro
  cadastro: boolean = false;
  //lista de categorias
  categorias: Categoria[] = [];

  //pesquisa
  listaPesquisa: Tarefa[] = [];
  pesquisa: string = ''

  //referentes ao drag
  tarefaAbaixo: Tarefa;
  categoriaAbaixo: Categoria;

  //opcoes de cadastro de propriedades
  opcoes: boolean;
  cadastroDePropriedades: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewChecked() {

    this.tamanhoTextArea();
  }

  ngOnInit() {

    //pega a lista de categorias
    if (localStorage.getItem("categorias") != null) {
      this.categorias = (JSON.parse(localStorage.getItem("categorias")));
    }
    //pega a lista de tarefas
    if (localStorage.getItem("listaTarefas") != null) {
      this.Tarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    }
    //pega a lista de propriedades
    if (localStorage.getItem("listaDePropriedades") != null) {
      this.listaDePropriedade = JSON.parse(localStorage.getItem("listaDePropriedades"));
    }
  }

  //muda os valores de cada propriedade na tarefa

  //agora tem que pegar o valor da propriedade 'valor' e colocala como o valor do input no html
  mudaPropriedade(event: Event, tarefa: Tarefa): void {
    const target = event.target as HTMLInputElement;

    let adiciona: boolean = true;
    for (let propriedade of tarefa.propriedades) {
      if (propriedade.id == target.id) {
        tarefa.propriedades[tarefa.propriedades.indexOf(propriedade)].valor = target.value;
        adiciona = false;
      }
    }

    if (adiciona) {
      tarefa.propriedades.push({ id: target.id, valor: target.value })
    }
  }

  pegaValor(target, tarefa):any{
    for(let propriedade of tarefa.propriedades){
        if(propriedade.id == target.id){
          return propriedade.valor;
        }
    }
    return "";
  }

  //definem o tamanho das textareas para o tamanho da string interior
  tamanhoTextArea(): void {
    for (let textarea of this.el.nativeElement.querySelectorAll("textarea")) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }
  @ViewChild('cadastro2') myElementRef: ElementRef;
  @ViewChild('cadastroPropriedade') cadastroPropriedade: ElementRef;

  //mostra o as opcoes de tarefas
  mostraOpcoes(): void {
    if (this.opcoes) {
      this.escondeOpcoes();
    } else {
      this.opcoes = true;

    }
  }

  //esconde o as opcoes de tarefas
  escondeOpcoes(): void {
    this.opcoes = false;
  }

  mostrarCadastroPropriedade(): void {
    if (this.cadastroDePropriedades) {
      this.renderer.setStyle(this.cadastroPropriedade.nativeElement, 'animation', 'popupAnimationSair 0.3s ease-in-out');
      setTimeout(() => {
        this.cadastroDePropriedades = false;
      }, 250)
    } else {
      this.cadastroDePropriedades = true;
    }
  }

  //Propriedades------------------------------------------------DePropi-------------------
  propriedade: Propriedade = {
    nome: "",
    tipo: "",
    opcoes: []
  }
  opcaoCadastro: string;
  listaDePropriedade: Propriedade[] = [];

  cadastrarPropriedade(): void {
    if (this.propriedade.tipo == "select") {
      this.listaDePropriedade.push({ nome: this.propriedade.nome, tipo: this.propriedade.tipo, opcoes: this.propriedade.opcoes })
    } else {
      this.listaDePropriedade.push({ nome: this.propriedade.nome, tipo: this.propriedade.tipo })
    }
    localStorage.setItem("listaDePropriedades", JSON.stringify(this.listaDePropriedade))
    this.propriedade.nome = "";
    this.propriedade.tipo = "";
    this.propriedade.opcoes = [];
  }

  isSelecao(): boolean {
    return (this.propriedade.tipo == "select" ? true : false)
  }

  adicionaOpcao() {
    this.propriedade.opcoes.push(this.opcaoCadastro);
    this.opcaoCadastro = "";
  }
  //Propriedades-----------------------------------------------------------------------------------

  //mostra ou esconde os inputs de cadastro
  cadastrar(): void {
    if (!this.cadastro) {
      this.cadastro = true;
    } else {
      this.renderer.setStyle(this.myElementRef.nativeElement, 'animation', 'popupAnimationSair 0.3s ease-in-out');
      setTimeout(() => {
        this.cadastro = false
      }, 250)
      this.tarefaCadastro.titulo = "";
      this.tarefaCadastro.categoria = "";
      this.semTituloETexto = false;
      this.semCat = false;
    }
  }

  semTituloETexto = false;
  semCat = false;

  //metodo de cadastro de tarefas
  CadastrarTarefa(): void {
    const TarefaInserida: Tarefa = {
      categoria: this.tarefaCadastro.categoria,
      titulo: this.tarefaCadastro.titulo,
      propriedades: this.tarefaCadastro.propriedades
    }
    this.Tarefas.push(TarefaInserida);
    this.tarefaCadastro.categoria = "";
    this.tarefaCadastro.titulo = "";
    this.tarefaCadastro.propriedades = [];
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }

  // metodo para deletar uma tarefa
  Del(indice: number) {
    this.Tarefas.splice(indice, 1);
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }

  alerta = false;

  @ViewChild('alerta') alertaElemento: ElementRef;
  fechaAlerta() {
    this.renderer.setStyle(this.alertaElemento.nativeElement, 'animation', 'popupAnimationSair 0.3s ease-in-out');
    setTimeout(() => {
      this.alerta = false
    }, 250)
  }

  //metodo que muda o conteudo de uma textarea
  muda(tarefa: Tarefa): void {
    if (/^\s*$/.test(tarefa.titulo)) {
      tarefa.titulo = this.antigaTarefa.titulo;
      this.alerta = true;
    }
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }

  // define a tarefa abaixo do drag
  defineTarefaAbaixo(tarefa: Tarefa, event: DragEvent): void {
    this.tarefaAbaixo = tarefa;
  }

  // define a categoria abaixo do drag
  defineCategoriaAbaixo(categoria: Categoria): void {
    this.categoriaAbaixo = categoria;
  }



  // muda a categoria e a ordem da tarefa
  mudarCatDrag(tarefa: Tarefa): void {
    if (this.categoriaAbaixo.nome != "") {
      tarefa.categoria = this.categoriaAbaixo.nome;
    }
    if (this.tarefaAbaixo != null) {
      if (this.Tarefas.indexOf(tarefa) < this.Tarefas.indexOf(this.tarefaAbaixo)) {
        this.Tarefas.splice(this.Tarefas.indexOf(tarefa), 1);
        this.Tarefas.splice(this.Tarefas.indexOf(this.tarefaAbaixo) + 1, 0, tarefa);
      } else {
        this.Tarefas.splice(this.Tarefas.indexOf(tarefa), 1);
        this.Tarefas.splice((this.Tarefas.indexOf(this.tarefaAbaixo)), 0, tarefa);
      }
    }
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }

  antigaTarefa: Tarefa;
  defineAntigaTarefa(tarefa: Tarefa) {
    this.antigaTarefa =
    {
      titulo: tarefa.titulo,
      categoria: tarefa.categoria,
      propriedades: tarefa.propriedades
    }
  }

  //muda o indicador de bloqueio do drag 
  mudaBloqueio(event: any): void {
    event.preventDefault();
  }
}