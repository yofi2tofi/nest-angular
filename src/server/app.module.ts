// nest
import { Module } from '@nestjs/common';

// modules
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AngularUniversalModule } from './modules/angular-universal/angular-universal.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { EmailerModule } from './modules/emailer/emailer.module';
import { OwnershipModule } from './modules/ownership/ownership.module';
// import { GraphqlModule } from './modules/graphql/graphql.module';

import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    DatabaseModule,
    EmailerModule,
    AuthModule,
    UserModule,
    SettingsModule,
    PaymentsModule,
    OwnershipModule,
    // GraphqlModule,
    AngularUniversalModule.forRoot()
  ],
  controllers: [],
  providers: [
    AuthGuard
  ]
})
export class ApplicationModule {}
