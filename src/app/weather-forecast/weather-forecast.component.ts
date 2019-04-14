import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BaseComponent } from '~/framework';

import { WeatherForecastService } from '~/shared/services';
import { OpenWeatherResponseModel } from '~/shared/models';
import { CityListService } from '~/shared/services/city-list.service';


@Component({
  selector: 'dev-challenge-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent extends BaseComponent implements OnInit {
  weatherForecast$!: Observable<OpenWeatherResponseModel>;
  currentCity: string;

  constructor(private readonly weatherForecastService: WeatherForecastService,
              private readonly cityListService: CityListService) {
    super();

    this.currentCity = 'London';
  }

  ngOnInit() {
    // this.weatherForecast$ = this.weatherForecastService
    //   .getCurrentWeather(this.currentCity);

    this.cityListService
      .searchCity('londo')
      .subscribe(cur => {
        console.log(cur);
      });
  }

}
