import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from './auth.service';

@Injectable()
export class IntercepterService implements HttpInterceptor {
  public authService;

  constructor(
    private injector: Injector
  ) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: token }});
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    return next.handle(this.addToken(request, this.authService.getToken()))
        .do((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.headers.get('token')) {
            this.authService.setToken(event.headers.get('token'));
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.authService.logout();
            } else {
              console.log(err.error);
            }
          }
        });
  }
}
