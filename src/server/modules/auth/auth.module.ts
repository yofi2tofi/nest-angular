import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { authenticate } from 'passport';

// Strategies
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { FacebookStrategy } from './passport/facebook.strategy';
import { TwitterStrategy } from './passport/twitter.strategy';
import { GoogleStrategy } from './passport/google-plus.strategy';

import { UserModule } from '../user/user.module';
import { EmailerModule } from '../emailer/emailer.module';
import { LoggerModule } from '../logger/logger.module';

import { authProviders } from './auth.providers';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { bodyValidatorMiddleware } from './middlewares/body-validator.middleware';

@Module({
  imports: [
    UserModule,
    EmailerModule,
    LoggerModule
  ],
  providers: [
    ...authProviders,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    FacebookStrategy,
    TwitterStrategy,
    GoogleStrategy
  ],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply([
        bodyValidatorMiddleware,
        authenticate('local-signup', { session: false })
      ])
      .forRoutes('api/auth/local/signup');

    consumer
      .apply([
        bodyValidatorMiddleware,
        authenticate('local-signin', { session: false })
      ])
      .forRoutes('api/auth/local/signin');

    consumer
      .apply([
        bodyValidatorMiddleware,
        authenticate('local-signin-admin', { session: false })
      ])
      .forRoutes('api/auth/local/0958235789sd7fg9as07fas90d8f7');

    consumer
      .apply([
        bodyValidatorMiddleware,
        authenticate('local-change', { session: false })
      ])
      .forRoutes('api/auth/local/change-password');

    consumer
      .apply([
        authenticate('local-reset', { session: false })
      ])
      .forRoutes('api/auth/reset/:id');

    consumer
      .apply(authenticate('facebook', { session: false }))
      .forRoutes('api/auth/facebook/token');

    consumer
      .apply(authenticate('twitter', { session: false }))
      .forRoutes('api/auth/twitter/token');

    consumer
      .apply(authenticate('google', { session: false }))
      .forRoutes('api/auth/google/token');

    consumer
      .apply(authenticate('jwt', { session: false }))
      .forRoutes('api/auth/authorized');
  }
}
