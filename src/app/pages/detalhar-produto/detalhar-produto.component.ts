import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagemProdutoDTO, ProdutoDto } from '../../interfaces/produto';
import { CategoriProduto } from '../../enum/categori-produto';
import { CORE_API_URL } from '../../services/api/core.constants';
import { ProdutoService } from '../../services/api/produto.service';

@Component({
  selector: 'app-detalhar-produto',
  templateUrl: './detalhar-produto.component.html',
  styleUrl: './detalhar-produto.component.css'
})
export class DetalharProdutoComponent implements OnInit{
  private API_URL: String = inject(CORE_API_URL);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private produtoService: ProdutoService = inject(ProdutoService);
  produtoDto: ProdutoDto = {
    nome: '',
    qtd: 0,
    precoUni: 0,
    descricao: '',
    categoria: CategoriProduto.Eletronicos
  };

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;

    this.produtoDto = {
      nome: params['nome'],
      qtd: Number(params['qtd']),
      precoUni: Number(params['precoUni']),
      descricao: params['descricao'],
      categoria: params['categoria'],
      imagens: params['imagens']
    };

    console.log('no log detalhar produto => ', this.produtoDto);
  }

  viewImage(imagens: ImagemProdutoDTO[]): string {
    if (imagens.length == 0) {
      return 'https://www.dialethoseventos.com.br/assets-custom/img/palestrantes/caju-e-castanha-05042025-131414.jpeg'
    }
    const path: string = imagens[0].path;
    const encodeFileKey = encodeURIComponent(path);
    console.log('imagem do produto que está sendo carregada => ', imagens[0].path);
    return `${this.API_URL}/files/img?nomeArquivo=${encodeFileKey}`
  }
}
