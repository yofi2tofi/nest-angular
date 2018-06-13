import { Module } from '@nestjs/common';

import { PaymentsController } from './payments.controller';

import { CoinpaymentsModule } from './coinpayments/coinpayments.module';

@Module({
  imports: [CoinpaymentsModule],
  controllers: [PaymentsController],
  providers: [],
  exports: []
})
export class PaymentsModule {}
