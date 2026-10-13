import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { from, switchMap } from 'rxjs';
import { KeycloakService } from '../services/auth/keycloak.service';
import { environment } from '../enviroments/enviroments';

/**
 * Interceptor que anexa o Bearer token do Keycloak às requisições HTTP.
 * 
 * - Ignora requisições para o próprio Keycloak
 * - Renova o token automaticamente se estiver próximo da expiração
 * - Usa Authorization Code Flow + PKCE (tokens gerenciados pelo keycloak-js)
 */
export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(KeycloakService);

  // Não anexa token em requisições para o Keycloak
  if (req.url.startsWith(environment.keycloak.url)) {
    return next(req);
  }

  // Renova o token se necessário e anexa às requisições
  return from(keycloak.updateToken(30)).pipe(
    switchMap(() => {
      const token = keycloak.getToken();

      if (!token) {
        return next(req);
      }

      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(authReq);
    })
  );
};
