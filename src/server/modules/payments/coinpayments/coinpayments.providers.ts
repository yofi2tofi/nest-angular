const Coinpayments = require('coinpayments');

import { coinpaymentsConfig } from './config/coinpayments.config';
import { COINPAYMENTS_PAYMENT_TOKEN } from '../../../server.constants';

export const CoinpaymentsProviders = [
  {
    provide: COINPAYMENTS_PAYMENT_TOKEN,
    useFactory: () => new Coinpayments(coinpaymentsConfig)
  },
];
