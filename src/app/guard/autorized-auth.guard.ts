import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { UsuarioService } from '../services/usuario.service';
import { LoginResponse, UsuarioResponse } from '../interfaces/usuario-request';

export const autorizedAuthGuard: CanActivateFn = (route, state) => {
  const storageLocalService: StorageServiceService = inject(StorageServiceService);
  const usuarioService:UsuarioService = inject(UsuarioService);
  const loginResponse:LoginResponse = storageLocalService.getItem('login') as LoginResponse;
  
  

  return true;
};
