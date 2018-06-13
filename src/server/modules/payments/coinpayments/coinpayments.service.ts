import { Injectable, Inject } from '@nestjs/common';

import { ITransactionConfig } from './interfaces/transaction.interface';
import { COINPAYMENTS_PAYMENT_TOKEN } from '../../../server.constants';

@Injectable()
export class CoinpaymentsService {
  constructor(
    @Inject(COINPAYMENTS_PAYMENT_TOKEN) private readonly coinpayments: any
  ) {}

  async createTransaction(): Promise<any> {
    const option: ITransactionConfig = {
      currency1: 'USD',
      currency2: 'BTC',
      amount: 1
    };

    return new Promise((resolve: Function, reject: Function) => {
      this.coinpayments.createTransaction(option, (err: any, result: any) => {
        console.log(err, result);
        resolve();
      });
    });
  }
}
