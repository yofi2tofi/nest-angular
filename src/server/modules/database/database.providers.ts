const autoIncrement = require('mongoose-auto-increment');

import * as mongoose from 'mongoose';
import { SERVER_CONFIG, DB_CONNECTION_TOKEN, DB_AUTOINCREMENT_TOKEN } from '../../server.constants';

export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise;

      return await mongoose.connect(SERVER_CONFIG.db, {
        useMongoClient: true,
      });
    },
  }
];
