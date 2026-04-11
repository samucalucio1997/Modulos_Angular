import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { LoginResponse, UsuarioResponse } from '../interfaces/usuario-request';

export const autorizedAuthGuard: CanActivateFn = (route, state) => {
  const storageLocalService: StorageServiceService = inject(StorageServiceService);
  const loginResponse: UsuarioResponse = storageLocalService.getItem('login') as UsuarioResponse;
  const authorities: string = loginResponse.role as string ;

  console.log('authories deste usuario => ', authorities);
  
  return authorities === 'ROLE_ADMIN';
};
