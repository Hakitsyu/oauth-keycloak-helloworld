import { ApplicationConfig, EnvironmentInjector, EnvironmentProviders, inject, makeEnvironmentProviders, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAuth } from './shared/auth/provider';
import { provideApi } from './api/provider';
import { provideConfiguration } from './shared/config/provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideConfiguration(),
    provideAuth(),
    provideApi()
  ]
};