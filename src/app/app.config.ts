import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './auth/interceptors/auth.interceptor';
import { loggingInterceptor } from './shared/interceptors/logging.interceptor';

registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withHashLocation()), 
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loggingInterceptor,
        authInterceptor
      ])
    ),
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ],
};