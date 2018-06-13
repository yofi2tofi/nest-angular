import { Module } from '@nestjs/common';

import { CoinpaymentsController } from './coinpayments.controller';
import { CoinpaymentsProviders } from './coinpayments.providers';
import { CoinpaymentsService } from './coinpayments.service';

@Module({
  imports: [],
  controllers: [CoinpaymentsController],
  providers: [
    ...CoinpaymentsProviders,
    CoinpaymentsService
  ],
  exports: []
})
export class CoinpaymentsModule {}
