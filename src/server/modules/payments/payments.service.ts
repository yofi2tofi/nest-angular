import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

import { COINPAYMENTS_MODEL_TOKEN, USER_MODEL_TOKEN } from '../../server.constants';
import { IUser } from '../user/interfaces/user.interface';
import { ICoinpayments } from './coinpayments/interfaces/coinpayments.log.interface';

@Injectable()
export class PaymentsService {

  constructor(
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>,
    @Inject(COINPAYMENTS_MODEL_TOKEN) private readonly coinpaymentsModel: Model<ICoinpayments>
  ) {}

  /**
   * Получаем все транзакции пользователя
   *
   * @param id
   */
  async getAllTransactions(id: string): Promise<any> {
    return await this.coinpaymentsModel.find({ userId: id });
  }
}
