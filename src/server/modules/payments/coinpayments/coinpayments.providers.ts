const Coinpayments = require('coinpayments');
import { Connection } from 'mongoose';

import { COINPAYMENTS_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../../server.constants';

import { coinpaymentsConfig } from './config/coinpayments.config';
import { COINPAYMENTS_PAYMENT_TOKEN } from '../../../server.constants';
import { CoinpaymentsSchema } from './schema/coinpayments.schema';

export const CoinpaymentsProviders = [
  {
    provide: COINPAYMENTS_PAYMENT_TOKEN,
    useFactory: () => new Coinpayments(coinpaymentsConfig)
  },
  {
    provide: COINPAYMENTS_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Coinpayments', CoinpaymentsSchema),
    inject: [DB_CONNECTION_TOKEN],
  }
];
