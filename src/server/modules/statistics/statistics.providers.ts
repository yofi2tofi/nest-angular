import { Connection } from 'mongoose';

import { StatisticsLogSchema } from './schemas/statistics.schema';
import { STATISTICS_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';

export const StatisticsProviders = [
  {
    provide: STATISTICS_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('StatisticsLog', StatisticsLogSchema),
    inject: [DB_CONNECTION_TOKEN],
  },
];
