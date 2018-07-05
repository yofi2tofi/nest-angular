import { Module, Global } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { LoggerProviders } from './logger.providers';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [],
  providers: [
    ...LoggerProviders,
    LoggerService
  ],
  exports: [
    ...LoggerProviders,
    LoggerService
  ]
})
export class LoggerModule {}
