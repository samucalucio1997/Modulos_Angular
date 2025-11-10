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
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public totalElements: number = 50;
  categorias = CategoriProduto;
  CategoriProduto = CategoriProduto; // Para usar no template
  private produtoService: ProdutoService = inject(ProdutoService);
  
  filtrosForm!: FormGroup;
  
  constructor(private fb: FormBuilder) { 
    this.initializerFormsFilter();
  }

  initializerFormsFilter() {
    this.filtrosForm = this.fb.group({
      categoriaSelecionada: [],
      precoMinimo: [],
      precoMaximo: []
    });
  }

  ngOnInit() {
   
    this.carregarProdutos(this.getCategoria()?.value || '', this.getPrecoMinimo()?.value || 0, this.getPrecoMax()?.value || 0, 0, this.pageSize);

    this.getCategoria().valueChanges.subscribe(
      categoria => {
        console.log(categoria);
        this.carregarProdutos(categoria || '', this.getPrecoMinimo()?.value || 0, this.getPrecoMax()?.value || 0, this.pageIndex, this.pageSize);
      } 
    )
  }

  carregarProdutos(categoria:string, precoMin:number, precoMax:number, pageIndex: number, pageSize:number) {
    this.carregando = true;
    this.produtoService.getProdutoList(categoria, precoMin, precoMax, pageIndex, pageSize)
    .subscribe({
      next: (produtosResponse) => {
        this.produtos = produtosResponse.content;
        this.pageIndex = produtosResponse.number;
        this.pageSize = produtosResponse.size;
        this.totalElements = produtosResponse.totalElements;
        console.log("json ativo", {
  pageIndex: this.pageIndex,
  pageSize: this.pageSize,
  totalElements: this.totalElements,
  totalPages: produtosResponse.totalPages,
});
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.carregando = false;
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }

  limparFiltros() {
    // this.filtrosForm.
  }

  searchDataPage(page: number): void {
    console.log('passando aqui', page);
    this.carregarProdutos(this.getCategoria().value || '', this.getPrecoMinimo()?.value || 0, this.getPrecoMax()?.value || 0, page, this.pageSize);
  }

  searchDataSize(size: number): void {
    // console.log(size);
    this.carregarProdutos(this.getCategoria().value || '', this.getPrecoMinimo()?.value || 0, this.getPrecoMax()?.value || 0, this.pageIndex, size);
  }

  getCategoriaNome(categoria: CategoriProduto): string {
    // console.log("aqui ta a categoria backend " + CategoriProduto[categoria])
    return CategoriProduto[categoria] || 'Desconhecida';
  } 

  // getCorCategoria(categoria: CategoriProduto): string {
  //   switch (categoria) {
  //     case CategoriProduto.Eletronica:
  //       return 'blue';
  //     case CategoriProduto.Alimentício:
  //       return 'green';
  //     case CategoriProduto.Roupas:
  //       return 'purple';
  //     case CategoriProduto.Imaterial:
  //       return 'orange';
  //     default:
  //       return 'default';
  //   }
  // }

  getCategoria(): FormControl {
    return this.filtrosForm.get("categoriaSelecionada") as FormControl;
  }

  getPrecoMax(): FormControl {
    return this.filtrosForm.get("precoMaximo") as FormControl;
  }

  getPrecoMinimo(): FormControl {
    return this.filtrosForm.get("precoMinimo") as FormControl;
  }
}
