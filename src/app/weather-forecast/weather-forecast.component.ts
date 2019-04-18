import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CityResponseModel, OpenWeatherResponseModel } from '~/shared/models';
import { CityListService, WeatherForecastService } from '~/shared/services';

/**
 * WeatherForecastComponent
 *
 * @description
 * Represent a component which are display information about current weather by {@link initialCityName}
 * Get information about weather thought {@link WeatherForecastService}
 * Get information about available cities thought {@link CityListService}
 *
 * Path city information to {@link CityAutocompleteComponent}
 * Change weather information after {@link citySelected} event
 */
@Component({
  selector: 'dev-challenge-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastComponent implements OnInit {
  weatherForecast$!: Observable<OpenWeatherResponseModel>;
  cities$!: Observable<Array<CityResponseModel>>;
  selectedCity!: CityResponseModel;
  initialCityName = 'London';

  constructor(private readonly weatherForecastService: WeatherForecastService,
              private readonly cityListService: CityListService,
              private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.cities$ = this.cityListService.getCities();
  }

  /**
   * citySelected
   *
   * @description
   * Event was called after city selection on {@link CityAutocompleteComponent}
   * Then get information about weather in the city.
   *
   */
  citySelected(city: CityResponseModel) {
    this.selectedCity = city;
    this.cdr.markForCheck();
    this.weatherForecast$ = this.weatherForecastService
      .getCurrentWeather(city.id);
  }

}
