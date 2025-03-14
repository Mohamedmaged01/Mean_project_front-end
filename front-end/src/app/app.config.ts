import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
     providers: [   provideHttpClient(),provideZoneChangeDetection({ eventCoalescing: true }),
          provideRouter(routes ,withComponentInputBinding(), withViewTransitions()),
          ]
};