const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

import { NestApplication, HTTP_SERVER_REF } from '@nestjs/core';
import { SERVER_CONFIG, DB_SESSION_TOKEN } from '../../server.constants';

export const databaseSessionProviders = {
  provide: DB_SESSION_TOKEN,
  useFactory: (app: NestApplication) => {
  return session({
      secret: SERVER_CONFIG.sessionSecret,
      store: new MongoStore({
        url: SERVER_CONFIG.db
      })
    });
  },
  inject: [HTTP_SERVER_REF]
};
