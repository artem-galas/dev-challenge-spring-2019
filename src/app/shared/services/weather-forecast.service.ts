import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { OpenWeatherResponseModel } from '~/shared/models';

import { WeatherForecastConfig, WeatherForecastConfigService } from './weather-forecast.config.service';
import { catchError } from 'rxjs/operators';

type ID = number;
type cityName = string;

type getCurrentWeatherParams = ID | cityName;

/**
 * WeatherForecastService
 *
 * @description
 * Service which responsible for getting current weather.
 * Service has special configuration which are described {@link WeatherForecastConfigService}
 * Can be injectable to any class.
 *
 * @example
 * ```
 * class MyComponent {
 *   currentWeather;
 *
 *   constructor(private weatherForecastService: WeatherForecastService) {
 *     weatherForecastService
 *      .getCurrentWeather(123)
 *      .subscribe(currentWeather => this.currentWeather = currentWeather)
 *   }
 * }
 * ```
 */
@Injectable()
export class WeatherForecastService {
  private readonly apiUrl = '//api.openweathermap.org/data/2.5/weather/';

  constructor(
    @Inject(WeatherForecastConfigService) private readonly config: WeatherForecastConfig,
    private readonly http: HttpClient
  ) {}

  /**
   * getCurrentWeather
   *
   * @description
   * Method get information about current weather by cityID or cityName.
   * Using {@link apiUrl} and configuration from {@link WeatherForecastConfig} to use apiToken and units options for API.
   * Return data asynchronous using Observable.
   *
   * If params is not correct throw TypeError;
   * If response is error return {@link throwError} with error body;
   *
   * @param {number | string} value {@link getCurrentWeatherParams}
   * @return {Observable<OpenWeatherResponseModel>} {@link OpenWeatherResponseModel}
   */
  getCurrentWeather(value: getCurrentWeatherParams): Observable<OpenWeatherResponseModel> {
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

    return this.http.get<OpenWeatherResponseModel>(`${this.apiUrl}`, {params})
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => throwError(httpErrorResponse.error))
      );
  }

}
