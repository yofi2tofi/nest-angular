import { Injectable, Inject, forwardRef, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

import { USER_MODEL_TOKEN, SERVER_CONFIG } from '../../server.constants';
import { IUser } from './interfaces/user.interface';
import { JWT } from '../../modules/auth/interfaces/jwtToken.interface';
import { ISettingsDto } from './interfaces/settings.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>,
  ) {}

  /**
   * Сохраняет аватар в базу
   *
   * @param file
   */
  public async uploadAvatarFile(token: string, file: any) {
    const { sub } = this.validateToken(token) as JWT;
    await this.userModel.update(
      { _id: sub },
      { $set: {
        'local.avatar': file.path
      }}
    );
    return file.path;
  }

  /**
   * Обновляет настройки пользователя
   *
   * @param token
   * @param data
   */
  public async updateSettings(token: string, data: ISettingsDto) {
    const { sub } = this.validateToken(token) as JWT;
    const self = this;
    for (const key in data) {
      await update(key);
    };
    async function update(key: string) {
      const prop = `settings.${key}`;
      const obj: any = {};
      obj[prop] = data[key];
      await self.userModel.update(
        { _id: sub },
        { $set: obj }
      ).exec();
    }
  }

  /**
   * Валидирует jwt токен из заголовка
   */
  private validateToken(token: string) {
    return verify(token, SERVER_CONFIG.jwtSecret);
  }
}
