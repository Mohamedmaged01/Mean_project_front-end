import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { authinterceptorInterceptor } from './interceptor/authinterceptor.interceptor';

export const appConfig: ApplicationConfig = {
     providers: [provideHttpClient(withInterceptors([authinterceptorInterceptor])),provideZoneChangeDetection({ eventCoalescing: true }),
          provideRouter(routes ,withComponentInputBinding(), withViewTransitions())
          ]
};