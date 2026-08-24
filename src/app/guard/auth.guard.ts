import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { KeycloakService } from '../services/auth/keycloak.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService: StorageServiceService = inject(StorageServiceService);
  const router: Router = inject(Router);
  const keycloak: KeycloakService = inject(KeycloakService);
  
  const loginResponse: string = storageService.getItemString('token') as string;
  const nameLogin = keycloak.getUsername;

  if (loginResponse != '' || nameLogin != null) {
    return true;
  }
  
  router.navigate(['/auth/login']);
  return false;
};
