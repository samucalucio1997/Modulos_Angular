import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ProdutoDto } from '../../interfaces/produto';
import { PageResponse } from '../../interfaces/response/PageResponse';
import { CORE_API_URL } from './core.constants';

const API_BASEURL_PRODUTO: string = 'http://localhost:8082/produto';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  
  private API_URL: String = inject(CORE_API_URL);

  private http: HttpClient = inject(HttpClient);

  editarProduto(produtoId: number, 
    nome: string,
    qtd: number,
    categoria: string,
    precoUni: number,
    descricao: string,
    files?: NzUploadFile | NzUploadFile[]) : Observable<boolean> {
    const formData = new FormData();
    const params = new HttpParams()
    .set('produtoId', String(produtoId))
    .set('nome', String(nome))
    .set('qtd', Number(qtd))
    .set('categoria', String(categoria))
    .set('precoUni', Number(precoUni))
    .set('descricao', String(descricao))
    ;

    // formData.append('produto_id', new File([String(produtoId)], '', { type: 'text/plain' }));
    // formData.append('produto', new File([JSON.stringify(produto)], 'produto.json', { type: 'application/json' }));

    if (files) {
      console.log('verificando a lista de uploads ', Array.isArray(files));
      if (Array.isArray(files)) {
        files.forEach(file => {
          if (file.originFileObj) {
            formData.append('imagens', file.originFileObj);
          }
        });
      } else if (files?.originFileObj) {
        formData.append('imagens', files.originFileObj);
      }
    }

    return this.http.request<boolean>('PATCH', `${this.API_URL}/produto/editarProduto`, {
      params: params,
      body: formData,
      responseType: 'json',
    });
  }

  
  cadastrarProduto(
     produto: ProdutoDto,
     files?: NzUploadFile | NzUploadFile[]
  ): Observable<boolean> {

     const formData = new FormData();
     
     formData.append(
       'produto',
       new File([JSON.stringify(produto)], 'produto.json', { type: 'application/json' })
     );
   
     if (Array.isArray(files)) {
       files.forEach(file => {
         if (file.originFileObj) {
            formData.append('img', file.originFileObj);
         }
       });
     } else if (files?.originFileObj) {
       formData.append('img', files.originFileObj);
     }
   
     return this.http.post<boolean>(
       `${API_BASEURL_PRODUTO}/cadastraProduto`,
       formData
     );
  }

  getProdutoList(categoria: string | null, precoMin?: number | null, precoMax?: number | null, pageIndex: number = 0, pageSize: number = 0): Observable<PageResponse<ProdutoDto>> {
    let params = new HttpParams();

    params = params.set("categoria", String(categoria));
    
    if (precoMin != null) {
      params = params.set("precoMin", precoMin);
    }
    if (precoMax != null) {
      params = params.set("precoMax", precoMax);
    }

    if (pageSize != 0) {
      params = params.set("size", pageSize);
    } else{
      params = params.set("size", 10);
    }
    params = params.set("page", pageIndex)

    return this.http.get<PageResponse<ProdutoDto>>(`${API_BASEURL_PRODUTO}/produtos`, { params });
  }

  removerProduto(produtoId: number): Observable<Object> {
    let params: HttpParams = new HttpParams();
    params = params.set('produtoId', Number(produtoId));
    return this.http.delete(`${API_BASEURL_PRODUTO}/deletarProduto`,{params: params});
  }
}
