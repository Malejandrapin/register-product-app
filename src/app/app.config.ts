import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ProductRepository } from './domain/repositories/product.repository';
import { ProductRepositoryImpl } from './infrastructure/repositories/product.repository.impl';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: ProductRepository,
      useClass: ProductRepositoryImpl
    }
  ]
};
