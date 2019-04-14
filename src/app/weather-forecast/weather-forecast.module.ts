import { NgModule } from '@angular/core';

import { MaterialModule, SharedModule } from '~/framework';

import { TemperaturePipe, WeatherIconPipe } from '~/shared/pipes';

import { WeatherForecastComponent } from './weather-forecast.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
  ],
  declarations: [
    WeatherIconPipe,
    TemperaturePipe,
    WeatherForecastComponent
  ],
  exports: [
    WeatherForecastComponent
  ]
})
export class WeatherForecastModule { }
