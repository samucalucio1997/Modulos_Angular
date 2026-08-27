import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { from, switchMap } from 'rxjs';
import { KeycloakService } from '../services/auth/keycloak.service';
import { environment } from '../enviroments/enviroments';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const keycloak = inject(KeycloakService);

  const isKeycloakUrl = req.url.startsWith(environment.keycloak.url);
  if (isKeycloakUrl) {
    return next(req);
  }

  return from(keycloak.updateToken()).pipe(
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
