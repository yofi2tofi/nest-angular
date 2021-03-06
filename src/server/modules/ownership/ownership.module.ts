import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../logger/logger.module';

import { OwnershipController } from './ownership.controller';
import { OwnershipProviders } from './ownership.providers';
import { OwnershipService } from './ownership.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    LoggerModule
  ],
  controllers: [OwnershipController],
  providers: [
    OwnershipProviders,
    OwnershipService
  ],
  exports: [
    OwnershipProviders,
    OwnershipService
  ]
})
export class OwnershipModule {}
