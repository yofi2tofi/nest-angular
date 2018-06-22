import { Connection } from 'mongoose';

import { ContributionSchema } from './schemas/contribution.schema';
import { ContributionLogSchema } from './schemas/contribution.log.schema';
import { CONTRIBUTION_MODEL_TOKEN, CONTRIBUTIONLOGS_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';

export const ContributionProviders = [{
    provide: CONTRIBUTION_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Contribution', ContributionSchema),
    inject: [DB_CONNECTION_TOKEN],
  }, {
    provide: CONTRIBUTIONLOGS_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('ContributionLog', ContributionLogSchema),
    inject: [DB_CONNECTION_TOKEN],
}];
