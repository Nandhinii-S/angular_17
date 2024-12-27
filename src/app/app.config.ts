import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { GlobalErrorHandler, provideGlobalErrorHandler } from 'ngx-bugatlas';
import { routes } from './app.routes';
import { ApiErrorInterceptor } from './interceptor/api-error-interceptor.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideGlobalErrorHandler(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorHandler,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorInterceptor,
      multi: true, // Allow multiple interceptors
    },
    provideAnimations(), // required animations providers



  ]
};
