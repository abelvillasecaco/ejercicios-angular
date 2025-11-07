import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './services/auth';

export const authGuard: CanActivateFn = () => {
  const authService = inject(Auth);
  const router = inject(Router);

  if(authService.isAuthenticated()) {
    return true;
  }else {
    alert('No está autenticado. Redirigiendo al login...');
    router.navigate(['/login']);
    return false;
  }
};
