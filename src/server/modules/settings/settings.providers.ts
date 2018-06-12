import { Connection } from 'mongoose';

import { SettingsSchema } from './schemas/settings.schema';
import { SETTINGS_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';

export const SettingsProviders = [
  {
    provide: SETTINGS_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Setting', SettingsSchema),
    inject: [DB_CONNECTION_TOKEN],
  },
];
