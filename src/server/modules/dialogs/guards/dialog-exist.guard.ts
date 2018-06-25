import { Injectable, CanActivate, ExecutionContext, BadRequestException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

import { SERVER_CONFIG, DIALOGS_MODEL_TOKEN } from '../../../server.constants';
import { IDialog } from '../interfaces/dialog.interface';
import { JWT } from '../../../modules/auth/interfaces/jwtToken.interface';

@Injectable()
export class DialogExistGuard implements CanActivate {

  constructor(
    @Inject(DIALOGS_MODEL_TOKEN) private readonly dialogsModel: Model<IDialog>
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers: { authorization }, params: { id } } = request;
    const { sub } = this.validateToken(authorization) as JWT;

    try {
      const dialog = await this.dialogsModel.findOne(
        { _id: id,
          ids: sub }
      );
      if (dialog) {
        return true;
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
