import { Module } from '@nestjs/common';

import { UserModule } from '../../user/user.module';
import { SettingsModule } from '../../settings/settings.module';
import { DatabaseModule } from '../../database/database.module';

import { CoinbaseController } from './coinbase.controller';
import { CoinbaseProviders } from './coinbase.providers';
import { CoinbaseService } from './coinbase.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    SettingsModule
  ],
  controllers: [CoinbaseController],
  providers: [
    ...CoinbaseProviders,
    CoinbaseService
  ],
  exports: []
})
export class CoinbaseModule {}
