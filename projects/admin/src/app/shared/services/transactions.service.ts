import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TRANSACTIONS } from './api.list';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private host: string;

  constructor(
    private http: HttpClient
  ) {
    this.host = environment.api;
  }

  /**
   * Получаем все логи
   */
  public getAllTransactions(id: string): Observable<any> {
    return this.http.get([TRANSACTIONS, '/', id].join(''));
  }
}
