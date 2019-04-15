import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule, SharedModule } from '~/framework';

import { TemperaturePipe, WeatherIconPipe } from '~/shared/pipes';

import { WeatherForecastComponent } from './weather-forecast.component';
import { CityAutocompleteComponent } from './city-autocomplete/city-autocomplete.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
    WeatherIconPipe,
    TemperaturePipe,
    WeatherForecastComponent,
    CityAutocompleteComponent
  ],
  exports: [
    WeatherForecastComponent
  ]
})
export class WeatherForecastModule { }
