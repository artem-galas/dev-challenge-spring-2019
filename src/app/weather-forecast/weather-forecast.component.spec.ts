import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastComponent } from './weather-forecast.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CityListService, WeatherForecastService } from '~/shared/services';
import { cityResponseMock, openWeatherResponseMock } from '~/testing';

import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs';
import { TemperaturePipe, WeatherIconPipe } from '~/shared/pipes';

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;
  let nativeElement: any;
  let weatherForecastService: SpyObj<WeatherForecastService>;
  let cityListService: SpyObj<CityListService>;

  beforeEach(async(() => {
    weatherForecastService = jasmine.createSpyObj('WeatherForecastService', ['getCurrentWeather']);
    weatherForecastService.getCurrentWeather.and.returnValue(of(openWeatherResponseMock));

    cityListService = jasmine.createSpyObj('CityListService', ['getCities']);
    cityListService.getCities.and.returnValue(of([cityResponseMock]));

    TestBed.configureTestingModule({
      declarations: [
        WeatherIconPipe,
        TemperaturePipe,
        WeatherForecastComponent,
      ],
      providers: [
        {
          provide: WeatherForecastService,
          useValue: weatherForecastService
        },
        {
          provide: CityListService,
          useValue: cityListService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  describe('.ngOnInit', () => {
    it('should call .getCities()', () => {
      expect(cityListService.getCities)
        .toHaveBeenCalled();
    });
  });

  describe('.citySelected', () => {
    it('should call .getCurrentWeather()', () => {
      component.citySelected(cityResponseMock);

      expect(weatherForecastService.getCurrentWeather)
        .toHaveBeenCalledWith(cityResponseMock.id);

      expect(weatherForecastService.getCurrentWeather)
        .toHaveBeenCalledTimes(1);
    });
    it('should change title to "Weather in London"', async () => {
      component.citySelected(cityResponseMock);

      await fixture.whenStable();
      fixture.detectChanges();

      expect(nativeElement.querySelector('h2.title').textContent)
        .toContain('Weather in London');
    });
  });
});
