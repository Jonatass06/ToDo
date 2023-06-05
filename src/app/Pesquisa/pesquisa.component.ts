import { Component, Renderer2, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})

export class PesquisaComponent implements OnInit {

  tarefa: Tarefa = {
    texto: "",
    categoria: "",
    titulo: ""
  }

  Tarefas: Tarefa[] = [];
  cadastro: boolean = false;
  adicione: boolean = false;
  categorias: Categoria[] = [];
  pesquisas: any[] = JSON.parse(localStorage.getItem("listaPesquisa"));
  tarefaAbaixo: Tarefa;
  categoriaAbaixo: Categoria;
  paginaAnterior: string;
  antigaTarefa: Tarefa;
  antigaCategoria: Categoria;

  constructor(private renderer: Renderer2, private el: ElementRef) { }


  ngOnInit() {
    if (localStorage.getItem("categorias") != null) {
      this.categorias = (JSON.parse(localStorage.getItem("categorias")));
    }
    if (localStorage.getItem("listaTarefas") != null) {
      this.Tarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    }
    this.paginaAnterior = localStorage.getItem("paginaAberta")
  }

  defineListaPesquisa(): void {
    if (JSON.parse(localStorage.getItem("listaPesquisa")) != this.pesquisas) {
      this.pesquisas = JSON.parse(localStorage.getItem("listaPesquisa"));
    }
  }

  tamanhoTextArea(): void {
    for (let textarea of this.el.nativeElement.querySelectorAll("textarea")) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  Del(indice: number) {
    this.Tarefas.splice(this.pesquisas.indexOf(this.pesquisas[indice]), 1);
    this.pesquisas.splice(indice, 1);
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
    localStorage.setItem("listaPesquisa", JSON.stringify(this.pesquisas));
  }


  defineAntigaTarefa(tarefa: Tarefa, event:Event): void {
    this.antigaTarefa = {texto: tarefa.texto, categoria: tarefa.categoria, titulo: tarefa.titulo };
    const targetElement = event.target as HTMLInputElement;
    targetElement.disabled = false;
  }
  defineAntigaCategoria(categoria: Categoria, event:Event): void {
    this.antigaCategoria = { nome: categoria.nome, cor: categoria.cor };
    const targetElement = event.target as HTMLInputElement;
    targetElement.disabled = false;
  }

  muda(indice: number, event:Event): void {
    const targetElement = event.target as HTMLInputElement;
    targetElement.disabled = true;

    if (localStorage.getItem("categorias") != null) {
      this.categorias = (JSON.parse(localStorage.getItem("categorias")));
    }
    if (localStorage.getItem("listaTarefas") != null) {
      this.Tarefas = JSON.parse(localStorage.getItem("listaTarefas"));
    }

    if (this.paginaAnterior == "/categoria") {
      for (let categoria of this.categorias) {
        if (categoria.cor == this.antigaCategoria.cor &&
          categoria.nome == this.antigaCategoria.nome) {
          this.categorias.splice(this.categorias.indexOf(categoria), 0, this.pesquisas[indice]);
          this.categorias.splice(this.categorias.indexOf(categoria), 1);
          for (let tarefa of this.Tarefas) {
            if (tarefa.categoria == this.antigaCategoria.nome) {
              tarefa.categoria = this.pesquisas[indice].nome;
            }
          }
        }
      }
    } else if (this.paginaAnterior == "/tarefas") {
      for (let tarefa of this.Tarefas) {
        if (this.acharTarefa(this.antigaTarefa) != null) {
          this.Tarefas.splice(this.Tarefas.indexOf(tarefa), 0, this.pesquisas[indice]);
          this.Tarefas.splice(this.Tarefas.indexOf(tarefa), 1);
        }
      }
    }

    localStorage.setItem("categorias", JSON.stringify(this.categorias));
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
    localStorage.setItem("listaPesquisa", JSON.stringify(this.pesquisas));

  }

  defineTarefaAbaixo(tarefa: Tarefa, event: DragEvent): void {
    this.tarefaAbaixo = tarefa;
  }

  defineCategoriaAbaixo(categoria: Categoria): void {
    this.categoriaAbaixo = categoria;
  }

  mudarCatDrag(tarefa: Tarefa): void {
    if (this.categoriaAbaixo.nome != "") {
      tarefa.categoria = this.categoriaAbaixo.nome;
    }

    console.log(this.Tarefas.indexOf(this.acharTarefa(tarefa)));
    console.log(this.Tarefas.indexOf(this.acharTarefa(this.tarefaAbaixo)));

    if (this.tarefaAbaixo != null) {
      if (this.pesquisas.indexOf(tarefa) < this.pesquisas.indexOf(this.tarefaAbaixo)) {
        this.pesquisas.splice(this.pesquisas.indexOf(tarefa), 1);
        this.pesquisas.splice(this.pesquisas.indexOf(this.tarefaAbaixo) + 1, 0, tarefa);
        this.Tarefas.splice(this.Tarefas.indexOf(this.acharTarefa(tarefa)), 1);
        this.Tarefas.splice(this.Tarefas.indexOf(this.acharTarefa(this.tarefaAbaixo)) + 1, 0, tarefa);
      } else if (this.pesquisas.indexOf(tarefa) > this.pesquisas.indexOf(this.tarefaAbaixo)) {
        this.pesquisas.splice(this.pesquisas.indexOf(tarefa), 1);
        this.pesquisas.splice((this.pesquisas.indexOf(this.tarefaAbaixo)), 0, tarefa);
        this.Tarefas.splice(this.Tarefas.indexOf(this.acharTarefa(tarefa)), 1);
        this.Tarefas.splice(this.Tarefas.indexOf(this.acharTarefa(this.tarefaAbaixo)), 0, tarefa);
      }
      console.log(this.Tarefas)
    }

    console.log(this.Tarefas)
    localStorage.setItem("listaPesquisa", JSON.stringify(this.pesquisas));
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
  }

  acharTarefa(tarefaEncontrar: Tarefa): Tarefa {
    for (let tarefa of this.Tarefas) {
      if (tarefa.titulo == tarefaEncontrar.titulo &&
        tarefa.texto == tarefaEncontrar.texto &&
        tarefa.categoria == tarefaEncontrar.categoria) {
        return tarefa;
      }
    }
    return null;
  }

  mudaBloqueio(event: any): void {
    event.preventDefault();
  }

  //deleta categoria e as tarefas com aquela categoria
  delCat(indice: number) {
    for (let tarefa of this.Tarefas) {
      if (tarefa.categoria == this.categorias[indice].nome) {
        this.Tarefas.splice(this.Tarefas.indexOf(tarefa));
      }
    }

    this.categorias.splice(this.pesquisas.indexOf(this.pesquisas[indice]), 1);
    this.pesquisas.splice(indice, 1);
    localStorage.setItem("categorias", JSON.stringify(this.categorias));
    localStorage.setItem("listaTarefas", JSON.stringify(this.Tarefas));
    localStorage.setItem("listaPesquisa", JSON.stringify(this.pesquisas));

  }
}