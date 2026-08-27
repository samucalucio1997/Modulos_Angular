import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../services/auth/keycloak.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const keycloak: KeycloakService = inject(KeycloakService);

  if (keycloak.isAuthenticated()) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
