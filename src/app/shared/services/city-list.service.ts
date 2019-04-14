import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { filter, map } from 'rxjs/operators';

import { CityResponseModel } from '~/shared/models';

import * as pako from 'pako';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CityListService {

  constructor(private readonly http: HttpClient) { }

  searchCity(cityName: string): Observable<Array<CityResponseModel>> {
    cityName = cityName.toLocaleLowerCase();
    let headers = new HttpHeaders();
    headers = headers.append('Content-Encoding', 'gzip');
    headers = headers.append('Content-type', 'application/gzip');

    return this.http.get('/assets/city.list.json.gz', {
      responseType: 'arraybuffer',
      headers,
    })
      .pipe(
        map((arrayBuffer) => {
          const data = new Uint8Array(arrayBuffer);

          return (JSON.parse(pako.ungzip(data, {to: 'string'})) as Array<CityResponseModel>);
        }),
        map(cities => cities
          .filter(city => {
            return city.name
              .toLocaleLowerCase()
              .includes(cityName);
          }))
      );
  }
}
