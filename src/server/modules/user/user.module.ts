import { Module, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserService
  ],
  exports: [
    ...userProviders,
    UserService
  ]
})
export class UserModule {}
