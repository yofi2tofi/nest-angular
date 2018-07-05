import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';

import { DialogsController } from './dialogs.controller';
import { DialogsProviders } from './dialogs.providers';
import { DialogsService } from './dialogs.service';

import { DialogExistGuard } from './guards/dialog-exist.guard';

@Module({
  imports: [
    DatabaseModule,
    UserModule
  ],
  controllers: [DialogsController],
  providers: [
    ...DialogsProviders,
    DialogsService,
    DialogExistGuard
  ],
  exports: [
    ...DialogsProviders,
    DialogsService
  ]
})
export class DialogsModule {}
