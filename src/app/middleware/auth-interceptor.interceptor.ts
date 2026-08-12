import { HttpInterceptorFn } from '@angular/common/http';
import { StorageServiceService } from '../services/storage-service.service';
import { UsuarioService } from '../services/api/usuario.service';
import { inject } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { KeycloakService } from '../services/auth/keycloak.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageServiceService);
  const usuarioService = inject(UsuarioService);
  const oauthService: OAuthService = inject(OAuthService);
  const keycloak = inject(KeycloakService);

  const token = storageService.getItemString('token') ?? oauthService.getIdToken();
  const isRefreshRequest = req.headers.get('x-skip-refresh') === 'true';

  if (req.url.includes('/auth/login') || req.url.includes('accounts.google.com')) {
    return next(req);
  }

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