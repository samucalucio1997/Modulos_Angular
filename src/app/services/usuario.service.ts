import { HttpClient } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioResponse } from '../interfaces/usuario-request';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  validarToken(token: string): Signal<UsuarioResponse>{
      const usuarioSignal = signal<UsuarioResponse | null>(null);

      this.http.post<UsuarioResponse>('/users/validate', { token })
        .subscribe(response => usuarioSignal.set(response));

      return usuarioSignal as Signal<UsuarioResponse>;
  }
}
