import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '~/framework';
import { WeatherForecastConfigService, WeatherForecastService } from '~/shared/services';

import { WeatherForecastModule } from './weather-forecast/weather-forecast.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    WeatherForecastModule
  ],
  providers: [
    WeatherForecastService,
    {
      provide: WeatherForecastConfigService,
      useValue: {
        apiToken: 'a0b3ae45f0033ba65a63e3c8177c6962',
        units: 'metric'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
