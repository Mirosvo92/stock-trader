import { Injectable } from '@angular/core';
import {BaseApi} from './base-api.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.models';
import {Stocks} from '../interfaces/stocks.interfaces';
import * as lowdb from 'lowdb';


@Injectable()
export class UsersService extends BaseApi {

  id: number;
  updateBalance = new BehaviorSubject({});

  constructor(public http: HttpClient) {
    super(http);
    if (localStorage.getItem('user')) {
      this.id = +localStorage.getItem('user');
    }
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.get(`users?email=${email}`);
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }

  getInfoAboutUser(id: number): Observable<User[]> {
    return this.get(`users?id=${id}`);
  }

  upgradeBalance(id: number, data: {'balance': number}) {
    return this.patch(`users/${id}`, data);
  }


}
