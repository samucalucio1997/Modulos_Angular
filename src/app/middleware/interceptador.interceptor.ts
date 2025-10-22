import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageServiceService } from '../services/storage-service.service';
import { LoginResponse, UsuarioResponse } from '../interfaces/usuario-request';
import { UsuarioService } from '../services/usuario.service';

export const interceptadorInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService: StorageServiceService = inject(StorageServiceService);
  const usuarioService: UsuarioService = inject(UsuarioService);
  const usuarioResponse:LoginResponse = storageService.getItem('login') as LoginResponse;
  let isTokenValido: boolean = false;
  let token: string 
  
  usuarioService.validarToken(usuarioResponse.token).subscribe({
    next: (resp: boolean) => {
      isTokenValido = resp
    },
    error: (err) => {
      console.error('erro na validação do token' + err);
    }
   });

  if (!isTokenValido) {
     usuarioService.refreshToken()
  } 

  if (isTokenValido) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${usuarioResponse.token}`
      }
    });
  }
  return next(req);
};
