import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const NotAuthenticatedGuard: CanActivateFn = async () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const ok = await firstValueFrom(
    authService.checkStatus()
  );

  if (ok) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};