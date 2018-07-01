import { Module } from '@nestjs/common';

import { PaymentsController } from './payments.controller';

import { CoinpaymentsModule } from './coinpayments/coinpayments.module';
// import { CoinbaseModule } from './coinbase/coinbase.module';

@Module({
  imports: [
    CoinpaymentsModule,
    // CoinbaseModule
  ],
  controllers: [PaymentsController],
  providers: [],
  exports: []
})
export class PaymentsModule {}
