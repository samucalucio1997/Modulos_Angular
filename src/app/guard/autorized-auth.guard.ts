import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioResponse } from '../interfaces/usuario-request';

export const autorizedAuthGuard: CanActivateFn = (route, state) => {
  const storageLocalService: StorageServiceService = inject(StorageServiceService);
  const usuarioService:UsuarioService = inject(UsuarioService);

  const usuarioResponse:UsuarioResponse = storageLocalService.getItem('login') as UsuarioResponse;
  

  return true;
};
