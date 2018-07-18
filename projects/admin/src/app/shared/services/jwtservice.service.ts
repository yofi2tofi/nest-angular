import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtserviceService {
  constructor(private authService: AuthService) {}

  public getPayload(): any {
    const decoded = jwt_decode(this.authService.getToken());
    return decoded.data;
  }
}
