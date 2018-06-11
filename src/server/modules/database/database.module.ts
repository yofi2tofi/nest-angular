import { Module } from '@nestjs/common';

import { databaseProviders } from './database.providers';
import { databaseSessionProviders } from './database-session.providers';

@Module({
  providers: [
    ...databaseProviders,
    databaseSessionProviders
  ],
  exports: [
    ...databaseProviders,
    databaseSessionProviders
  ]
})
export class DatabaseModule {}
