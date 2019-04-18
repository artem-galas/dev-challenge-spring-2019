import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { CityResponseModel } from '~/shared/models';

/**
 * CityAutocompleteComponent
 *
 * @description
 * Allow user search city using autocomplete.
 * For correct work should have {@link cities} and {@link initialCityName}
 * Emit {@link citySelected} event when city was selected
 *
 * @example
 * ```
 * <dev-challenge-city-autocomplete
 *   [cities]="cities"
 *   [initialCityName]="initialCityName"
 *   (citySelected)="citySelected($event)">
 * </dev-challenge-city-autocomplete>
 * ```
 */
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

  ngOnInit() {
    if (this.initialCityName) {
      const initialCity = this.searchCity(this.initialCityName)[0];

      this.cityCtrl.setValue(initialCity, {emitEvent: false});
      this.citySelected.emit(initialCity);
    }
    this.valueChanges();
  }

  /**
   * displayFn
   * @description
   * How selected city should be displayed in autocomplete
   *
   * @param {CityResponseModel} city
   * @return {string | undefined}
   */
  displayFn(city: CityResponseModel): string | undefined {
    return city ? `${city.name}, ${city.country}` : undefined;
  }

  /**
   * valueChanges
   * @description
   * Check when user typed to autocomplete and search city on {@link cities} Array
   */
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

  /**
   * searchCity
   * @description
   * Search city by name.
   *
   * @param {string} name
   * @return {Array<CityResponseModel>} - list of cities which are correct for searching params
   */
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
