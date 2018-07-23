import { Module, Global } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { LoggerController } from './logger.controller';
import { LoggerProviders } from './logger.providers';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [LoggerController],
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
