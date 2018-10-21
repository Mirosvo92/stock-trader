import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class MarketsService {

  constructor(public http: HttpClient) { }

  getData(): Observable<any> {
    const apiLink = '../../assets/stocks.json';
    return this.http.get(apiLink);
  }

}
