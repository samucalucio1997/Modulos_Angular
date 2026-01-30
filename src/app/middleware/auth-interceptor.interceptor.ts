import { HttpInterceptorFn } from '@angular/common/http';
import { StorageServiceService } from '../services/storage-service.service';
import { UsuarioService } from '../services/api/usuario.service';
import { inject } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageServiceService);
  const usuarioService = inject(UsuarioService);

  const token = storageService.getItemString('token') ?? '';
  const isRefreshRequest = req.headers.get('x-skip-refresh') === 'true';

  // Não adiciona token na requisição de login
  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  // Clona com Authorization se tiver token
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError(err => {

      // Se não for 401, não tenta refresh
      if (err.status !== 401) {
        return throwError(() => err);
      }

      // Evita loop: refresh não tenta outro refresh
      if (isRefreshRequest) {
        return throwError(() => err);
      }

      // Tenta refresh
      return usuarioService.refreshToken().pipe(
        switchMap((newToken: string) => {

          // Salva novo token
          storageService.setItem('token', newToken);

          // Reexecuta requisição com token novo
          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`
            }
          });

          return next(retryReq);
        }),

        // Refresh falhou → retorna erro final
        catchError(errRefresh => throwError(() => errRefresh))
      );
    })
  );
};