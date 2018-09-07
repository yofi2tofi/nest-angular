import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LOGS } from './api.list';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = environment.api;
  }

  /**
   * Получаем все логи
   */
  public getAll(id: string): Observable<any> {
    return this.http.get([LOGS, '/', id].join(''));
  }
}
