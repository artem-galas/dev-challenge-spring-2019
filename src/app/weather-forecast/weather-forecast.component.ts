import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseComponent } from '~/framework';

import { CityResponseModel, OpenWeatherResponseModel } from '~/shared/models';
import { CityListService, WeatherForecastService } from '~/shared/services';

@Component({
  selector: 'dev-challenge-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastComponent extends BaseComponent implements OnInit {
  weatherForecast$!: Observable<OpenWeatherResponseModel>;
  cities$!: Observable<Array<CityResponseModel>>;
  selectedCity!: CityResponseModel;
  initialCityName = 'London';

  constructor(private readonly weatherForecastService: WeatherForecastService,
              private readonly cityListService: CityListService,
              private readonly cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.cities$ = this.cityListService.getCities();
  }

  citySelected(city: CityResponseModel) {
    this.selectedCity = city;
    this.cdr.markForCheck();
    this.weatherForecast$ = this.weatherForecastService
      .getCurrentWeather(city.id);
  }

}
