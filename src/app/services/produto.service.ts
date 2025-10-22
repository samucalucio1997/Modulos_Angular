import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProdutoDto, ProdutoReponse } from '../interfaces/produto';
import { Observable } from 'rxjs';

const API_BASEURL_PRODUTO: String = 'http://localhost:8080/produto';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  
  private http: HttpClient = inject(HttpClient);
  
  cadastrarProduto(produto: ProdutoDto): void {
     
  }

  getProdutoList(): Observable<ProdutoReponse[]> {
    return this.http.get<ProdutoReponse[]>(API_BASEURL_PRODUTO + '/produtos');
  }
}
