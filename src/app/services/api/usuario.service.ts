import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginResponse, UsuarioResponse } from '../../interfaces/usuario-request';
import { StorageServiceService } from '../storage-service.service';
import { CORE_API_URL } from './core.constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http: HttpClient = inject(HttpClient);
  private storageService: StorageServiceService = inject(StorageServiceService);
  private API_URL: String = inject(CORE_API_URL);
  private apiUrl = 'http://localhost:8082';

  autenticarUsuario(nomeUsuario: string, senha: string): Observable<LoginResponse> {
    const params = new HttpParams()
      .set('username', nomeUsuario)
      .set('password', senha);

    return this.http.post<LoginResponse>(
      `${this.API_URL}/auth/login`,
      params.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  autenticarComGoogle(token: string): Observable<LoginResponse> {
      const params = new HttpParams()
      .set('token', token);
      return this.http.post<LoginResponse>(`${this.API_URL}/auth/google`, params.toString());
  }

  validarToken(token: String): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/auth/validate', { token });
  }

  refreshToken(): Observable<string> {
    const token = this.storageService.getItemString('token') ?? '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'x-skip-refresh': 'true' // sinaliza ao interceptor para não tentar novo refresh nesta req
    });

    return this.http.get(`${this.apiUrl}/auth/refresh`, { headers, responseType: 'text' });
  }

}