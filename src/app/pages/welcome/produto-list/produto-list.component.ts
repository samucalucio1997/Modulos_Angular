import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CategoriProduto } from '../../../enum/categori-produto';
import { ImagemProdutoDTO, ProdutoDto } from '../../../interfaces/produto';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { CORE_API_URL } from '../../../services/api/core.constants';
import { ProdutoService } from '../../../services/api/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.css'
})
export class ProdutoListComponent implements OnInit{
  
  private API_URL: String = inject(CORE_API_URL);
  formBuilder: FormBuilder = inject(FormBuilder);
  carregando: boolean = false;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public totalElements: number = 50;
  formProdutoFilter!: FormGroup;
  categorias = CategoriProduto;
  private produtoService: ProdutoService = inject(ProdutoService);
  listaProdutos: ProdutoDto[] = [];

  ngOnInit(): void {
    this.formProdutoFilter = this.formBuilder.group({
      precoMinimo: [0.0],
      precoMaximo: [0.0],
      categoria: []
    });

    this.carregarProdutos(this.getCategoria()?.value || '', this.getPrecoMinimo()?.value || 0, this.getPrecoMax()?.value || 0, 0, this.pageSize);

  }

  carregarProdutos(categoria:string, precoMin:number, precoMax:number, pageIndex: number, pageSize:number) {
    this.carregando = true;
    this.produtoService.getProdutoList(categoria, precoMin, precoMax, pageIndex, pageSize)
    .subscribe({
      next: (produtosResponse) => {
        this.listaProdutos = produtosResponse.content;
        this.pageIndex = produtosResponse.number;
        this.pageSize = produtosResponse.size;
        this.totalElements = produtosResponse.totalElements;
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
    this.formProdutoFilter = this.formBuilder.group({
      precoMin: [0.0],
      precoMax: [0.0],
      categoria: []
    });
  }

  searchDataPage(page: number): void {
   this.carregarProdutos(this.getCategoria()?.value || '', this.getPrecoMinimo()?.value || 0, this.getPrecoMax()?.value || 0, page - 1, this.pageSize);
  }

  searchDataSize(size: number): void {
    this.carregarProdutos(this.getCategoria()?.value || '', this.getPrecoMinimo()?.value || 0, this.getPrecoMax()?.value || 0, this.pageIndex, size);
  }     

  viewImage(imagens: ImagemProdutoDTO[]): string {
    if (imagens.length == 0) {
       return 'https://www.dialethoseventos.com.br/assets-custom/img/palestrantes/caju-e-castanha-05042025-131414.jpeg'
    }
    const path: string = imagens[0].path;
    return `${this.API_URL}/files/img?nomeArquivo=${path}`
  }

  getCategoria(): FormControl {
    return this.formProdutoFilter.get("categoriaSelecionada") as FormControl;
  }
  
  getPrecoMax(): FormControl {
    return this.formProdutoFilter.get("precoMaximo") as FormControl;
  }
  
  getPrecoMinimo(): FormControl {
    return this.formProdutoFilter.get("precoMinimo") as FormControl;
  }

}
