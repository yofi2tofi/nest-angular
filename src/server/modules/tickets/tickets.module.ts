import { Module, Global } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

import { TicketsController } from './tickets.controller';
import { TicketsProviders } from './tickets.providers';
import { TicketsService } from './tickets.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule
  ],
  controllers: [TicketsController],
  providers: [
    ...TicketsProviders,
    TicketsService
  ],
  exports: [
    TicketsService
  ]
})
export class TicketsModule {}
