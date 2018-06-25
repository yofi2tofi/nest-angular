import { Connection } from 'mongoose';

import { DialogSchema } from './schemas/dialog.schema';
import { DIALOGS_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';

export const DialogsProviders = [
  {
    provide: DIALOGS_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Dialog', DialogSchema),
    inject: [DB_CONNECTION_TOKEN],
  },
];
