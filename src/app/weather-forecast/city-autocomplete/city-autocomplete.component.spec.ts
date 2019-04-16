import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import SpyObj = jasmine.SpyObj;

import { of } from 'rxjs';

import { cityResponseMock } from '~/testing';
import { CityListService } from '~/shared/services';

import { CityAutocompleteComponent } from './city-autocomplete.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material';

describe('CityAutocompleteComponent', () => {
  let component: CityAutocompleteComponent;
  let fixture: ComponentFixture<CityAutocompleteComponent>;
  let cityListService: SpyObj<CityListService>;

  beforeEach(async(() => {
    cityListService = jasmine.createSpyObj('CityListService', ['getCities']);
    cityListService.getCities.and.returnValue(of(cityResponseMock));

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule
      ],
      declarations: [
        CityAutocompleteComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        {
          provide: CityListService,
          useValue: cityListService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
