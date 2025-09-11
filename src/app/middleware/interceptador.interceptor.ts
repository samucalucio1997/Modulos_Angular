import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageServiceService } from '../services/storage-service.service';
import { UsuarioResponse } from '../interfaces/usuario-request';

export const interceptadorInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService: StorageServiceService = inject(StorageServiceService);
  const usuarioResponse:UsuarioResponse = storageService.getItem('login') as UsuarioResponse;
  if (usuarioResponse) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${usuarioResponse.token}`
      }
    });
  }
  return next(req);
};
