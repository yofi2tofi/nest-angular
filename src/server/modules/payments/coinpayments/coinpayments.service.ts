import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';

import {
  SERVER_CONFIG,
  COINPAYMENTS_PAYMENT_TOKEN,
  SETTINGS_MODEL_TOKEN,
  COINPAYMENTS_MODEL_TOKEN,
  USER_MODEL_TOKEN } from '../../../server.constants';
import { ITransactionConfig } from './interfaces/transaction.interface';
import { ICoinpayments } from './interfaces/coinpayments.log.interface';

import { ISettings } from '../../settings/interfaces/settings.interface';
import { IUser } from '../../user/interfaces/user.interface';
import { JWT } from '../../../modules/auth/interfaces/jwtToken.interface';
import { IToken } from '../../../modules/auth/interfaces/token.interface';
import { timesSeries } from 'async';

@Injectable()
export class CoinpaymentsService {
  constructor(
    @Inject(COINPAYMENTS_PAYMENT_TOKEN) private readonly coinpayments: any,
    @Inject(COINPAYMENTS_MODEL_TOKEN) private readonly coinpaymentsModel: Model<ICoinpayments>,
    @Inject(SETTINGS_MODEL_TOKEN) private readonly settingModel: Model<ISettings>,
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>
  ) {}

  async createTransaction(token: string): Promise<any> {
    const { sub } = this.validateToken(token) as JWT;

    const option: ITransactionConfig = {
      currency1: 'BTC',
      currency2: 'BTC',
      amount: 1
    };

    this.coinpayments.createTransaction(option, async (err: any, result: any) => {
      console.log(err, result);
      if (err) {
        return false;
      }

      await new this.coinpaymentsModel({
        amount: result.amount,
        txnId: result.txn_id,
        address: result.address,
        userId: sub,
      }).save();

      await this.userModel.update(
        { _id : sub },
        { $push: {
          'payments.coinpayments': {
            amount: result.amount,
            txnId: result.txn_id,
            address: result.address,
            time: Date.now()
          }
        }}
      ).exec();
    });
  }

  /**
   * Закрывает транзакцию по полученному id транзакции, начисляет реф премию
   *
   * @param token
   */
  async closeTransaction(txnId: string): Promise<any> {
    const setting = await this.settingModel.findOne();
    const { refSystem: { refill } } = setting;
    try {
      const { _id, userId } = await this.coinpaymentsModel.findOne({ txnId });
      const user = await this.userModel.findOne({ _id: userId });
      const transactions = await this.userModel.aggregate([
            { $match: {
              'payments.coinpayments.txnId': txnId }
            }, {
              $project: {
                coinpayments: {
                  $filter: {
                    input: '$payments.coinpayments',
                    as: 'item',
                    cond: { $eq: [ '$$item.txnId', txnId ]}
                  }
                }
              }
            }
          ]);
      const { coinpayments }: any = transactions.reduce((a, b) => Object.assign({}, a, b), {});
      const coinpayment: any = coinpayments.reduce((a: any, b: any) => Object.assign({}, a, b), {});

      await this.coinpaymentsModel.update(
        { _id },
        { $set: { status: true }}
      ).exec();

      await this.userModel.update(
        { 'payments.coinpayments._id': coinpayment._id },
        { $set: {
          'payments.coinpayments.$.status': true
        }}
      ).exec();

      await this.userModel.update(
        { _id: userId },
        { $set: {
          'balance.income': +user.balance.income + +coinpayment.amount,
          'balance.current': +user.balance.current + +coinpayment.amount,
        }}
      ).exec();

      if (refill.type === 'classic') {
        await this.giveRefFeeClassic(refill.options, userId, coinpayment.amount);
      }

      return;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  /**
   * Рекурсивная асинхронная функция начисления реф премии исходя из опций
   *
   * @private
   * @param {string[]} options
   * @param {string} userId
   * @param {string} amount
   * @returns {Promise<any>}
   * @memberof CoinpaymentsService
   */
  private async giveRefFeeClassic(options: string[], userId: string, amount: string): Promise<any> {
    let counter = 0;
    const userModel = this.userModel;

    async function work() {
      const user = await userModel.findOne({ _id : userId });

      if (user.refSystem.refferer) {
        const refferer = await userModel.findOne({ _id: user.refSystem.refferer });
        userId = refferer._id;

        const procent = options[counter];
        const fee = +amount / 100 * +procent;

        await userModel.update(
          { _id: userId },
          { $set: {
            'balance.outcome': +refferer.balance.outcome + fee
          }}
        ).exec();
      } else {
        return;
      }

      if (counter < options.length) {
        counter++;
        await work();
      }

      return;
    }

    return work();
  }

  /**
   * Валидирует jwt токен из заголовка
   */
  private validateToken(token: string) {
    return verify(token, SERVER_CONFIG.jwtSecret);
  }
}
