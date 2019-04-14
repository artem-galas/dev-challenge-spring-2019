import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { interval, Observable } from 'rxjs';

import { OpenWeatherResponseModel } from '~/shared/models';

import { WeatherForecastConfig, WeatherForecastConfigService } from './weather-forecast.config.service';
import { switchMapTo } from 'rxjs/operators';

type ID = number;
type cityName = string;

@Injectable()
export class WeatherForecastService {
  private readonly apiUrl = '//api.openweathermap.org/data/2.5/weather/';

  constructor(
    @Inject(WeatherForecastConfigService) private readonly config: WeatherForecastConfig,
    private readonly http: HttpClient
  ) {}

  getCurrentWeather(value: ID | cityName): Observable<OpenWeatherResponseModel> {
    let params = new HttpParams();
    params = params.append('appid', this.config.apiToken);
    params = params.append('units', this.config.units);

    if (typeof value === 'string') {
      params = params.append('q', value);
    } else if (typeof value === 'number') {
      params = params.append('id', value.toString());
    } else {
      throw TypeError('Invalid arguments types. It can be string or number');
    }

    return interval(10_000)
      .pipe(
        switchMapTo(this.http.get<OpenWeatherResponseModel>(`${this.apiUrl}`, {params}))
      );
  }

}
