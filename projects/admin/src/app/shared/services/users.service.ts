import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { USERS } from './api.list';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = environment.api;
  }

  /**
   * Получаем всех пользователей
   */
  public getAll(): Observable<any> {
    return this.http.get([USERS].join(''));
  }
}
