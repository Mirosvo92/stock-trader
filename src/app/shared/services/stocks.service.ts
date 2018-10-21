import { Injectable } from '@angular/core';
import {BaseApi} from './base-api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stocks} from '../interfaces/stocks.interfaces';


@Injectable()
export class StocksService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getListUserStocks(id: number): Observable<Stocks[]> {
    return this.get(`stocks?idUser=${id}`);
  }

  addStocks(stocks: Stocks): Observable<Stocks> {
    return this.post(`stocks`, stocks);
  }

  delStocks(id: number) {
    return this.delete(`stocks/${id}`);
  }

  updateStocks(count: number, id: number ): Observable<Stocks> {
    return this.patch(`stocks/${id}`, {'count': count});
  }


}
