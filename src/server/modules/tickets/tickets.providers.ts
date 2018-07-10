import { Connection } from 'mongoose';

import { TicketSchema } from './schemas/ticket.schema';
import { TICKETS_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';

export const TicketsProviders = [
  {
    provide: TICKETS_MODEL_TOKEN,
    useFactory: (connection: Connection) => connection.model('Ticket', TicketSchema),
    inject: [DB_CONNECTION_TOKEN],
  },
];
