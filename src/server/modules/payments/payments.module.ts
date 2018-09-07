import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

import { CoinpaymentsModule } from './coinpayments/coinpayments.module';
// import { CoinbaseModule } from './coinbase/coinbase.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CoinpaymentsModule
    // CoinbaseModule
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService
  ],
  exports: [
    PaymentsService
  ]
})
export class PaymentsModule {}
