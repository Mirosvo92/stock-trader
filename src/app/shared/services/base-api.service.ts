import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BaseApi {

  private baseUrl = 'http://localhost:3000/';

  constructor(public http: HttpClient) {
  }

  getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }

  get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url));
  }

  post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data);
  }

  put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data);
  }

  patch(url: string = '', data: any = {}): Observable<any> {
    return this.http.patch(this.getUrl(url), data);
  }

  delete(url: string = '', data: any = {}): Observable<any> {
    return this.http.delete(this.getUrl(url));
  }
}
