import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { LoginResponse } from '../interfaces/usuario-request';

export const autorizedAuthGuard: CanActivateFn = (route, state) => {
  const storageLocalService: StorageServiceService = inject(StorageServiceService);
  const loginResponse:LoginResponse = storageLocalService.getItem('login') as LoginResponse;
  const authorities:string = loginResponse.user.authorities?.at(0)?.authority as string ;
  
  return authorities === 'ROLE_ADMIN';
};
