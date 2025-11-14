import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageServiceService } from '../services/storage-service.service';
import { LoginResponse, UsuarioResponse } from '../interfaces/usuario-request';
import { UsuarioService } from '../services/usuario.service';
import { catchError, switchMap, tap, throwError } from 'rxjs';

export const interceptadorInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService: StorageServiceService = inject(StorageServiceService);
  const usuarioService: UsuarioService = inject(UsuarioService);
  const usuarioResponse:string = storageService.getItemString('token') as string;
  let isTokenValido: boolean = false;
  
  usuarioService.validarToken(usuarioResponse).subscribe({
    next: (resp: boolean) => {
      isTokenValido = resp
    },
    error: (err) => {
      console.error('erro na validação do token' + err);
    }
   });

  if (isTokenValido) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${usuarioResponse}`
      }
    });
  }
  return next(req).pipe(
    catchError(err => {
      
      if (err.status == 401) {
        return throwError(() => err);
      }

      return usuarioService.refreshToken()
      .pipe(tap((refreshToken: string) => {
         storageService.setItem('token', refreshToken);
      }),
      switchMap(() => next(req))
    )

    })
  );
};
