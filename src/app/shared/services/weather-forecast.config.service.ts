import { InjectionToken } from '@angular/core';

export interface WeatherForecastConfig {
  apiToken: string;
  units: 'metric' | 'imperial';
}

export const WeatherForecastConfigService = new InjectionToken<WeatherForecastConfig>('WeatherForecastConfig');
