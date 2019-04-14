import { NgModule } from '@angular/core';

import { MaterialModule, SharedModule } from '~/framework';
import { WeatherForecastComponent } from './weather-forecast.component';
import { WeatherIconPipe } from '~/shared/pipes/weather-icon.pipe';
import { TemperaturePipe } from '~/shared/pipes/temperature.pipe';

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
