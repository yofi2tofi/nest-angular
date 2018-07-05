import { Connection } from 'mongoose';
import { LoggerSchema } from './schemas/logger.schema';
import { LOGS_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';

export const LoggerProviders = [
  {
    provide: LOGS_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Log', LoggerSchema),
    inject: [DB_CONNECTION_TOKEN],
  },
];
