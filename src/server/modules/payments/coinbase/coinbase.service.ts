import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

import {
  SERVER_CONFIG,
  COINBASE_MODEL_TOKEN,
  COINBASE_PAYMENT_TOKEN,
  SETTINGS_MODEL_TOKEN,
  USER_MODEL_TOKEN } from '../../../server.constants';

import { ICoinbase } from './interfaces/coinbase.interface';
import { ISettings } from '../../settings/interfaces/settings.interface';
import { IUser } from '../../user/interfaces/user.interface';
import { JWT } from '../../../modules/auth/interfaces/jwtToken.interface';
import { IToken } from '../../../modules/auth/interfaces/token.interface';

@Injectable()
export class CoinbaseService {
  constructor(
    @Inject(COINBASE_PAYMENT_TOKEN) private readonly coinbase: any,
    @Inject(COINBASE_MODEL_TOKEN) private readonly coinbaseModel: Model<ICoinbase>,
    @Inject(SETTINGS_MODEL_TOKEN) private readonly settingModel: Model<ISettings>,
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>
  ) {
  }

  /**
   * Создаем транзакцию
   *
   * @param token
   */
  public async createTransaction(token: string) {
    const data = {
      to: 'user1@example.com',
      amount: '1.234',
      currency: 'BTC',
      description: 'Sample transaction for you'
    };
    await this.coinbase.requestMoney(data, (err: any, txn: any) => {
      console.log('my txn id is: ' + txn.id);
    });
  }
}
