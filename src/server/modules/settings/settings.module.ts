import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

import { SettingsController } from './settings.controller';
import { SettingsProviders } from './settings.providers';
import { SettingsService } from './settings.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule
  ],
  controllers: [SettingsController],
  providers: [
    ...SettingsProviders,
    SettingsService
  ],
  exports: [
    ...SettingsProviders
  ]
})
export class SettingsModule {}
