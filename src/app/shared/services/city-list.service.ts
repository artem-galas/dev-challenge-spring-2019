import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CityResponseModel } from '~/shared/models';

import { ungzip } from 'pako';

@Injectable({
  providedIn: 'root'
})
export class CityListService {

  constructor(private readonly http: HttpClient) { }

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
