// nest
import { Module } from '@nestjs/common';

// modules
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AngularUniversalModule } from './modules/angular-universal/angular-universal.module';
import { GraphqlModule } from './modules/graphql/graphql.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    SettingsModule,
    // GraphqlModule,
    AngularUniversalModule.forRoot()
  ],
  controllers: []
})
export class ApplicationModule {}
