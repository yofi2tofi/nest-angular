import { Module } from '@nestjs/common';

import { OwnershipProviders } from './ownership.providers';
import { OwnershipService } from './ownership.service';

@Module({
  imports: [],
  controllers: [],
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
