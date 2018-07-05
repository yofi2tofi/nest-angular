import { Module } from '@nestjs/common';

import { ContributionModule } from '../contribution/contribution.module';
import { StatisticsModule } from '../statistics/statistics.module';

import { CronjobProviders } from './cronjob.providers';
import { CronjobService } from './cronjob.service';

@Module({
  imports: [
    ContributionModule,
    StatisticsModule
  ],
  controllers: [],
  providers: [
    ...CronjobProviders,
    CronjobService
  ],
  exports: [
    ...CronjobProviders,
    CronjobService
  ]
})
export class CronjobModule {}
