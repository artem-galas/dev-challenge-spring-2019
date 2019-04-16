import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '~/material/material.module';
import { TemperaturePipe, WeatherIconPipe } from '~/shared/pipes';

import { WeatherForecastComponent } from './weather-forecast.component';
import { CityAutocompleteComponent } from './city-autocomplete/city-autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
