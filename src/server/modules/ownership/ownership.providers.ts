import { Connection } from 'mongoose';

import { OwnershipSchema } from './schemas/ownership.shema';
import { OWNERSHIP_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';

export const OwnershipProviders = {
  provide: OWNERSHIP_MODEL_TOKEN,
  useFactory: (connection: Connection) => connection.model('Ownership', OwnershipSchema),
  inject: [DB_CONNECTION_TOKEN],
};
