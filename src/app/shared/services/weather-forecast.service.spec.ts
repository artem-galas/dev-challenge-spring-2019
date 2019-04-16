import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { WeatherForecastConfigService } from '~/shared/services/weather-forecast.config.service';
import { openWeatherResponseMock } from '~/testing';
import { OpenWeatherResponseModel } from '~/shared/models';

import { WeatherForecastService } from './weather-forecast.service';

describe('WeatherForecastService', () => {
  let service: WeatherForecastService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        WeatherForecastService,
        {
          provide: WeatherForecastConfigService,
          useValue: {
            apiToken: 'apiToken',
            units: 'metric'
          }
        }
      ]
    });

    service = TestBed.get(WeatherForecastService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service)
      .toBeTruthy();
  });

  describe('.getCurrentWeather by cityName', () => {
    let expectedResponse: OpenWeatherResponseModel;
    const mockValue = 'London';

    beforeEach(() => {
      service = TestBed.get(WeatherForecastService);
      expectedResponse = openWeatherResponseMock;
    });

    it('should return openWeatherResponse', () => {
      service.getCurrentWeather(mockValue)
        .subscribe(
          response => expect(response)
            .toEqual(expectedResponse),
          fail
        );

      const req = httpTestingController
        .expectOne(request => request.url.includes('api.openweathermap.org/data/2.5/weather'));

      expect(req.request.params.has('appid'))
        .toBeTruthy();

      expect(req.request.params.has('units'))
        .toBeTruthy();

      expect(req.request.params.has('q'))
        .toBeTruthy();

      req.flush(expectedResponse);
    });
  });

  describe('.getCurrentWeather by id', () => {
    let expectedResponse: OpenWeatherResponseModel;
    const mockValue = 2643743;

    beforeEach(() => {
      service = TestBed.get(WeatherForecastService);
      expectedResponse = openWeatherResponseMock;
    });

    it('should return openWeatherResponse', () => {
      service.getCurrentWeather(mockValue)
        .subscribe(
          response => expect(response)
            .toEqual(expectedResponse),
          fail
        );

      const req = httpTestingController
        .expectOne(request => request.url.includes('api.openweathermap.org/data/2.5/weather'));

      expect(req.request.params.has('appid'))
        .toBeTruthy();

      expect(req.request.params.has('units'))
        .toBeTruthy();

      expect(req.request.params.has('id'))
        .toBeTruthy();

      req.flush(expectedResponse);
    });

    it('should catch error response', () => {
      const errorResponse = {
        message: 'Server Error'
      };

      service.getCurrentWeather(mockValue)
        .subscribe(
          fail,
          (error) => expect(error)
              .toEqual(errorResponse)
        );

      const req = httpTestingController
        .expectOne(request => request.url.includes('api.openweathermap.org/data/2.5/weather'));

      req.flush({
        message: 'Server Error'
      }, {
        status: 500,
        statusText: 'Unknown Error',
      });
    });
  });
});
