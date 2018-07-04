import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { LoggerModule } from '../logger/logger.module';

import { ContributionController } from './contribution.controller';
import { ContributionService } from './contribution.service';
import { ContributionProviders } from './contribution.providers';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    LoggerModule
  ],
  controllers: [ContributionController],
  providers: [
    ...ContributionProviders,
    ContributionService
  ],
  exports: [
    ...ContributionProviders,
    ContributionService
  ]
})
export class ContributionModule {}
