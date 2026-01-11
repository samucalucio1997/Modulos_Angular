import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProdutoDto, ProdutoReponse } from '../interfaces/produto';
import { Observable } from 'rxjs';
import { PageResponse } from '../interfaces/response/PageResponse';
import { NzUploadFile } from 'ng-zorro-antd/upload';

const API_BASEURL_PRODUTO: string = 'http://localhost:8082/produto';
@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  
  private http: HttpClient = inject(HttpClient);
  
    cadastrarProduto(
      produto: ProdutoDto,
      files?: NzUploadFile | NzUploadFile[]
    ): Observable<boolean> {

      const formData = new FormData();
      
      formData.append(
        'produto',
        new Blob([JSON.stringify(produto)], { type: 'application/json' })
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
}
