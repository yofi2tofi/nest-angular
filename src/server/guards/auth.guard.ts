import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';

import { SERVER_CONFIG } from '../server.constants';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers: { authorization } } = request;

    try {
      this.validateToken(authorization);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Валидирует jwt токен из заголовка
   */
  private validateToken(token: string) {
    const verified = verify(token, SERVER_CONFIG.jwtSecret);
  }
}
