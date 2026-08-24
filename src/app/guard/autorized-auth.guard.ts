import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { LoginResponse, UsuarioResponse } from '../interfaces/usuario-request';
import { KeycloakService } from '../services/auth/keycloak.service';

export const autorizedAuthGuard: CanActivateFn = (route, state) => {
  const storageLocalService: StorageServiceService = inject(StorageServiceService);
  const loginResponse: UsuarioResponse = storageLocalService.getItem('login') as UsuarioResponse;
  const authorities: string = loginResponse.role as string ;
  const keycloak: KeycloakService = inject(KeycloakService);

  console.log('authories deste usuario => ', authorities);
  
  return authorities === 'ROLE_ADMIN' || keycloak.hasRole('ADMIN');
};
