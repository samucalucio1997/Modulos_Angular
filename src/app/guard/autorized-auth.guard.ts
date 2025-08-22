import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { UsuarioService } from '../services/usuario.service';

export const autorizedAuthGuard: CanActivateFn = (route, state) => {
  const storageLocalService: StorageServiceService = inject(StorageServiceService);
  const usuarioService:UsuarioService = inject(UsuarioService);

  const token = storageLocalService.getItem('token');
  

  if (token != null) {
    
  }

  return true;
};
