import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProdutoDto } from '../interfaces/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private http: HttpClient = inject(HttpClient);
  
  cadastrarProduto(produto: ProdutoDto): void {
     
  }
}
