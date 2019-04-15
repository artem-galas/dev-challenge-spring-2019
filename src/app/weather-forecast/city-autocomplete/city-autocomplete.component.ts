import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';


import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';

import { CityResponseModel } from '~/shared/models';

@Component({
  selector: 'dev-challenge-city-autocomplete',
  templateUrl: './city-autocomplete.component.html',
  styleUrls: ['./city-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityAutocompleteComponent implements OnInit {
  @Input() cities!: Array<CityResponseModel>;
  @Input() initialCityName!: string;
  @Output() citySelected = new EventEmitter<CityResponseModel>();

  cityCtrl = new FormControl();
  filteredOptions$!: Observable<Array<CityResponseModel>>;

  constructor() { }

  ngOnInit() {
    if (this.initialCityName) {
      const initialCity = this.searchCity(this.initialCityName)[0];

      this.cityCtrl.setValue(initialCity, {emitEvent: false});
      this.citySelected.emit(initialCity);
    }
    this.valueChanges();
  }

  displayFn(city: CityResponseModel): string | undefined {
    return city ? `${city.name}, ${city.country}` : undefined;
  }

  private valueChanges() {
    this.filteredOptions$ = this.cityCtrl
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        startWith<string | CityResponseModel>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.searchCity(name) : []),
      );
  }

  private searchCity(name: string): Array<CityResponseModel> {
    const filterValue = name.toLocaleLowerCase();

    return this.cities
      .filter(city => {
        return city.name
            .toLocaleLowerCase()
            .includes(filterValue);
        }
      );
  }
}
