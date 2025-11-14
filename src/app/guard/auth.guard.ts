import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { LoginResponse } from '../interfaces/usuario-request';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService: StorageServiceService = inject(StorageServiceService);
  const router: Router = inject(Router);
  
  try {
    const loginResponse: string = storageService.getItemString('token') as string;
    
    // Verifica se existe um token válido
    if (loginResponse != '') {
      return true;
    }
  } catch (error) {
    console.log('Usuário não autenticado:', error);
  }
  
  // Redireciona para login se não estiver autenticado
  router.navigate(['/auth/login']);
  return false;
};
