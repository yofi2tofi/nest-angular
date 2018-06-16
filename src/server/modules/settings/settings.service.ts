import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { SETTINGS_MODEL_TOKEN, USER_MODEL_TOKEN } from '../../server.constants';
import { ISettings } from './interfaces/settings.interface';
import { IUser } from '../user/interfaces/user.interface';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(SETTINGS_MODEL_TOKEN) private readonly settingsModel: Model<ISettings>,
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>
  ) {
    this.init();
  }

  /**
   * Определяет как будет указан урл для рефераллов
   */
  async init() {
    const settings: ISettings  = await this.settingsModel.findOne();

    if (!settings) {
      const newSettings: ISettings = new this.settingsModel({
        id: 0,
        refUrl: 'ref'
      });

      await newSettings.save();
    }
  }

  /**
   * Находим пользователя, которому принадлежит эта реф. ссылка
   * @TODO: сделать функцию хеширования урла при создании и декода
   *
   * @param query
   */
  async getReffer(query: any, session: any): Promise<null> {
    const settings: ISettings = await this.settingsModel.findOne();

    if (query[settings.refUrl]) {
      try {
        const user: IUser = await this.userModel.findOne({ 'system.refUrl': query[settings.refUrl] });
        if (user) {
          const { _id } = user;
          session.refferer = _id;
        }
      } catch (error) {
        console.log('settings', error);
      }
    }

    return;
  }
}
