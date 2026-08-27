import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../services/auth/keycloak.service';

export const autorizedAuthGuard: CanActivateFn = (route, state) => {
  const keycloak: KeycloakService = inject(KeycloakService);
  const router: Router = inject(Router);

  if (keycloak.hasRole('ADMIN')) {
    return true;
  }

  router.navigate(['/welcome']);
  return false;
};
