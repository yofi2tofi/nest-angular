import { Injectable, CanActivate, ExecutionContext, forwardRef, Inject } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

import { SERVER_CONFIG, USER_MODEL_TOKEN } from '../server.constants';
import { IUser } from '../modules/user/interfaces/user.interface';
import { UserService } from '../modules/user/user.service';
import { JWT } from '../modules/auth/interfaces/jwtToken.interface';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor() {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers: { authorization } } = request;

    try {
      const { role } = this.validateToken(authorization) as JWT;
      console.log(role);
      switch (role) {
        case '84dc16579d240f675add648c124f9dc6dac348cf8086712d49fafe80555455f5':
        return true;
        default:
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * Валидирует jwt токен из заголовка
   */
  private validateToken(token: string) {
    return verify(token, SERVER_CONFIG.jwtSecret);
  }
}
