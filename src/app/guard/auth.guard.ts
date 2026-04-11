import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService: StorageServiceService = inject(StorageServiceService);
  const router: Router = inject(Router);
  
  const loginResponse: string = storageService.getItemString('token') as string;

  console.log('esse token do login com o google')
  
  if (loginResponse != '') {
    return true;
  }
  
  router.navigate(['/auth/login']);
  return false;
};
