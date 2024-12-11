import { Provider } from '@angular/core';
import { ConfigurationService } from './config.service';

export function provideConfiguration(): Provider[] {
  return [
    ConfigurationService
  ]  
}