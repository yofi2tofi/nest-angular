import { Module } from '@nestjs/common';

import { UserModule } from '../../user/user.module';
import { SettingsModule } from '../../settings/settings.module';
import { DatabaseModule } from '../../database/database.module';
import { LoggerModule } from '../../logger/logger.module';

import { CoinpaymentsController } from './coinpayments.controller';
import { CoinpaymentsProviders } from './coinpayments.providers';
import { CoinpaymentsService } from './coinpayments.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    SettingsModule,
    LoggerModule
  ],
  controllers: [CoinpaymentsController],
  providers: [
    ...CoinpaymentsProviders,
    CoinpaymentsService
  ],
  exports: []
})
export class CoinpaymentsModule {}
