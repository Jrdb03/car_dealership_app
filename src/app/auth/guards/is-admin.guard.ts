import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const IsAdminGuard: CanMatchFn = async () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  await firstValueFrom(authService.checkStatus());

  if (!authService.isAdmin()) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};