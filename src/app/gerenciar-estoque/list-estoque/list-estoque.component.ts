import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CategoriProduto } from '../../enum/categori-produto';
import { ProdutoDto, ProdutoReponse } from '../../interfaces/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-list-estoque',
  templateUrl: './list-estoque.component.html',
  styleUrl: './list-estoque.component.css'
})
export class ListEstoqueComponent implements OnInit {
  
  produtos: ProdutoDto[] = [];
  produtosFiltrados: ProdutoDto[] = [];
  carregando: boolean = false;
  categorias = CategoriProduto;
  CategoriProduto = CategoriProduto; // Para usar no template
  private produtoService: ProdutoService = inject(ProdutoService);
  
  filtrosForm: FormGroup;
  categoriaSelecionada: FormControl;
  precoMinimo: FormControl;
  precoMaximo: FormControl;
  
  constructor(private fb: FormBuilder) {
    this.categoriaSelecionada = new FormControl(null);
    this.precoMinimo = new FormControl(null);
    this.precoMaximo = new FormControl(null);
    
    this.filtrosForm = this.fb.group({
      categoria: this.categoriaSelecionada,
      precoMinimo: this.precoMinimo,
      precoMaximo: this.precoMaximo
    });
  }

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.carregando = true;
    this.produtoService.getProdutoList()
    .subscribe({
      next: (produtosResponse) => {
        this.produtos = produtosResponse.map(pro => pro.produto) as ProdutoDto[];
        console.log('Produtos carregados:', produtosResponse);
        // this.aplicarFiltros();
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        // Em caso de erro, usar dados mock para teste
        this.carregando = false;
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }

  getCategoriaNome(categoria: CategoriProduto): string {
    return CategoriProduto[categoria] || 'Desconhecida';
  }

  

  
}
