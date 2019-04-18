import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CityResponseModel } from '~/shared/models';

import { ungzip } from 'pako';

/**
 * CityListService
 *
 * @description
 * Service which responsible for get all cities from city.list.json.gz.
 * Can be injectable to any class.
 *
 * @example
 * ```
 * class MyComponent {
 *   cities;
 *
 *   constructor(private cityListService: CityListService) {
 *     cityListService
 *      .getCities()
 *      .subscribe(cities => this.cities = cities)
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class CityListService {

  constructor(private readonly http: HttpClient) { }

  /**
   * getCities
   * @description
   * Get cities from city.list.json.gz unzip using {@link ungzip} method from pako package.
   * Return asynchronous data using Observable.
   *
   * @return {Observable<Array<CityResponseModel>>}
   */
  getCities(): Observable<Array<CityResponseModel>> {
    return this.http.get('/assets/city.list.json.gz', {
      responseType: 'arraybuffer',
    })
      .pipe(
        map((arrayBuffer) => {
          const data = new Uint8Array(arrayBuffer);

          return (
            JSON.parse(
              ungzip(data, {to: 'string'})
            ) as Array<CityResponseModel>
          );
        })
      );
  }
}
