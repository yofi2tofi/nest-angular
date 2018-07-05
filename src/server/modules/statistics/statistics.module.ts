import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

import { StatisticsProviders } from './statistics.providers';
import { StatisticsService } from './statistics.service';
import { SettingsController } from './statistics.controller';

@Module({
  imports: [
    DatabaseModule,
    UserModule
  ],
  controllers: [SettingsController],
  providers: [
    ...StatisticsProviders,
    StatisticsService
  ],
  exports: [
    ...StatisticsProviders,
    StatisticsService
  ]
})
export class StatisticsModule {}
