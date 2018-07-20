import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { AUTH } from './api.list';
import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class AuthService {
  private host: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.host = environment.api;
  }

  public auth(data: any): Observable<any> {
    return this.http.post([AUTH].join(''), data, httpOptions);
  }

  // public confirm(formData: Confirm): Observable<ConfirmResponce> {
  //   return this.http.post<ConfirmResponce>([this._host, CONFIRM].join(''), JSON.stringify(formData), httpOptions);
  // }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public clearToken(): void {
    localStorage.removeItem('token');
  }

  public logout(): void {
    this.clearToken();
    this.router.navigateByUrl('authorization');
  }

  public setToken(token: any): void {
    localStorage.setItem('token', token);
  }
}
