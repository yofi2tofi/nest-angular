import { Module } from '@nestjs/common';

import { emailerProviders } from './emailer.provider';
import { EmailerService } from './emailer.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    emailerProviders,
    EmailerService
  ],
  exports: [
    emailerProviders,
    EmailerService
  ]
})
export class EmailerModule {}
