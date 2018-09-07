import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { USERS } from './api.list';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private host: string;

  constructor() {}

}
