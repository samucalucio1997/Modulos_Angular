import { Component, OnInit } from '@angular/core';
import { Produto } from '../../interfaces/produto';
import { CategoriProduto } from '../../enum/categori-produto';

@Component({
  selector: 'app-list-estoque',
  templateUrl: './list-estoque.component.html',
  styleUrl: './list-estoque.component.css'
})
export class ListEstoqueComponent implements OnInit {
  
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  categorias = CategoriProduto;
  categoriaSelecionada: CategoriProduto | null = null;
  precoMinimo: number | string | null = null;
  precoMaximo: number | string | null = null;

  ngOnInit() {
    this.carregarDadosMockados();
    this.aplicarFiltros();
  }

  carregarDadosMockados() {
    this.produtos = [
      {
        matricula: 1,
        nome: 'Smartphone Samsung Galaxy',
        preco: 1200.00,
        setor: CategoriProduto.Eletronica,
        entradaEstoque: 15
      },
      {
        matricula: 2,
        nome: 'Camiseta Polo',
        preco: 89.90,
        setor: CategoriProduto.Roupa,
        entradaEstoque: 50
      },
      {
        matricula: 3,
        nome: 'Arroz Integral 5kg',
        preco: 25.50,
        setor: CategoriProduto.Alimentício,
        entradaEstoque: 100
      },
      {
        matricula: 4,
        nome: 'Licença de Software',
        preco: 500.00,
        setor: CategoriProduto.Imaterial,
        entradaEstoque: 1
      },
      {
        matricula: 5,
        nome: 'Notebook Dell',
        preco: 2500.00,
        setor: CategoriProduto.Eletronica,
        entradaEstoque: 8
      },
      {
        matricula: 6,
        nome: 'Calça Jeans',
        preco: 150.00,
        setor: CategoriProduto.Roupa,
        entradaEstoque: 30
      },
      {
        matricula: 7,
        nome: 'Feijão Preto 1kg',
        preco: 8.90,
        setor: CategoriProduto.Alimentício,
        entradaEstoque: 200
      },
      {
        matricula: 8,
        nome: 'Assinatura Premium',
        preco: 29.90,
        setor: CategoriProduto.Imaterial,
        entradaEstoque: 1
      }
    ];
  }

  aplicarFiltros() {
    this.produtosFiltrados = this.produtos.filter(produto => {
      const categoriaMatch = !this.categoriaSelecionada || produto.setor === this.categoriaSelecionada;
      
      const precoMin = typeof this.precoMinimo === 'string' ? parseFloat(this.precoMinimo) : this.precoMinimo;
      const precoMax = typeof this.precoMaximo === 'string' ? parseFloat(this.precoMaximo) : this.precoMaximo;
      
      const precoMinMatch = !precoMin || produto.preco >= precoMin;
      const precoMaxMatch = !precoMax || produto.preco <= precoMax;
      
      return categoriaMatch && precoMinMatch && precoMaxMatch;
    });
  }

  onCategoriaChange(categoria: CategoriProduto | null) {
    this.categoriaSelecionada = categoria;
    this.aplicarFiltros();
  }

  onPrecoMinimoChange(preco: number | string | null) {
    this.precoMinimo = typeof preco === 'string' ? parseFloat(preco) : preco;
    this.aplicarFiltros();
  }

  onPrecoMaximoChange(preco: number | string | null) {
    this.precoMaximo = typeof preco === 'string' ? parseFloat(preco) : preco;
    this.aplicarFiltros();
  }

  limparFiltros() {
    this.categoriaSelecionada = null;
    this.precoMinimo = null;
    this.precoMaximo = null;
    this.aplicarFiltros();
  }

  getNomeCategoria(categoria: CategoriProduto): string {
    switch (categoria) {
      case CategoriProduto.Eletronica:
        return 'Eletrônica';
      case CategoriProduto.Alimentício:
        return 'Alimentício';
      case CategoriProduto.Roupa:
        return 'Roupa';
      case CategoriProduto.Imaterial:
        return 'Imaterial';
      default:
        return 'Desconhecida';
    }
  }

  getCorCategoria(categoria: CategoriProduto): string {
    switch (categoria) {
      case CategoriProduto.Eletronica:
        return 'blue';
      case CategoriProduto.Alimentício:
        return 'green';
      case CategoriProduto.Roupa:
        return 'purple';
      case CategoriProduto.Imaterial:
        return 'orange';
      default:
        return 'default';
    }
  }

  getClasseEstoque(quantidade: number): string {
    if (quantidade <= 10) {
      return 'text-danger font-weight-bold';
    } else if (quantidade <= 50) {
      return 'text-warning font-weight-bold';
    } else {
      return 'text-success font-weight-bold';
    }
  }
}
