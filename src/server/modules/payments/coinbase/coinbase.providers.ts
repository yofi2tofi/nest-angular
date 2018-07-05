const Coinbase = require('coinbase');
import { Connection } from 'mongoose';

import { COINBASE_MODEL_TOKEN, COINBASE_PAYMENT_TOKEN, DB_CONNECTION_TOKEN } from '../../../server.constants';

import { coinbaseConfig } from './config/coinbase.config';
import { CoinbaseSchema } from './schema/coinbase.schema';

export const CoinbaseProviders = [
  {
    provide: COINBASE_PAYMENT_TOKEN,
    useFactory: async () => {
      const client = await new Coinbase.Client(coinbaseConfig);
      await client.getAccounts({}, (err: any, obj: any) => {
        console.log(err);
        console.log(obj);
      });
    }
  },
  {
    provide: COINBASE_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Coinbase', CoinbaseSchema),
    inject: [DB_CONNECTION_TOKEN],
  }
];
