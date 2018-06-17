import { Module } from '@nestjs/common';

import { OwnershipController } from './ownership.controller';
import { OwnershipProviders } from './ownership.providers';
import { OwnershipService } from './ownership.service';

@Module({
  imports: [],
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
