import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { from, switchMap } from 'rxjs';

import { KeycloakService } from '../services/auth/keycloak.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const keycloak = inject(KeycloakService);

  if (
    req.url.includes('/auth/login') ||
    req.url.includes('accounts.google.com')
  ) {
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