import { Injectable, UnauthorizedException, NotFoundException, RequestTimeoutException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { use } from 'passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';

import { IUser } from '../../user/interfaces/user.interface';
import {
  generateHashedPassword,
  generateSalt,
  generateHashedRefUrl,
  generateHashedRoleId,
  generateConfirmedHash } from '../../../utilities/encryption';
import { SERVER_CONFIG, MESSAGES, USER_MODEL_TOKEN } from '../../../server.constants';
import { EmailerService } from '../../emailer/emailer.service';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class LocalStrategy {
  constructor(
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>,
    private readonly loggerService: LoggerService,
    private readonly emailerService: EmailerService
  ) {
    this.init();
  }

  private init(): void {
    use('local-signup', new Strategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    }, async (req: any, email: string, password: string, done: Function) => {
      try {
        if (await this.userModel.findOne({ 'local.email': email })) {
          return done(new UnauthorizedException(MESSAGES.UNAUTHORIZED_EMAIL_IN_USE), false);
        }

        const refferer: string = req.session.refferer;

        const salt: string = generateSalt();
        const confirmedUrl = generateConfirmedHash(salt, Date.now().toString());
        const user: IUser = new this.userModel({
          method: 'local',
          local: {
            email,
            salt,
            hashedPassword: generateHashedPassword(salt, password),
            roleId: generateHashedRoleId(SERVER_CONFIG.jwtSecret, '5')
          },
          system: {
            confirmedUrl,
            refUrl: generateHashedRefUrl(salt, email)
          },
          refSystem: {
            refferer
          }
        });

        this.emailerService.sendCorfimedMail(email, confirmedUrl);

        if (refferer) {
          await this.userModel.update(
            { _id: refferer },
            { $push: {
              'refSystem.refferals': user._id
            }}
          ).exec();
        }

        await this.loggerService.logRegistration(user._id);

        await user.save();

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));

    use('local-signin', new Strategy({
      usernameField: 'email',
      passwordField: 'password'
    }, async (email: string, password: string, done: Function) => {
      try {
        const user: IUser = await this.userModel.findOne({ 'local.email': email });

        if (!user) {
          return done(new UnauthorizedException(MESSAGES.UNAUTHORIZED_INVALID_EMAIL), false);
        }

        if (generateHashedPassword(user.local.salt, password) !== user.local.hashedPassword) {
          return done(new UnauthorizedException(MESSAGES.UNAUTHORIZED_INVALID_PASSWORD), false);
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));

    use('local-signin-admin', new Strategy({
      usernameField: 'email',
      passwordField: 'password'
    }, async (email: string, password: string, done: Function) => {
      try {
        const user: IUser = await this.userModel.findOne({ 'local.email': email });

        if (!user) {
          return done(new UnauthorizedException(MESSAGES.UNAUTHORIZED_INVALID_EMAIL), false);
        }

        if (generateHashedPassword(user.local.salt, password) !== user.local.hashedPassword) {
          return done(new UnauthorizedException(MESSAGES.UNAUTHORIZED_INVALID_PASSWORD), false);
        }

        if (user.local.roleId !== '84dc16579d240f675add648c124f9dc6dac348cf8086712d49fafe80555455f5') {
          return done(new UnauthorizedException(MESSAGES.UNAUTHORIZED_INVALID_EMAIL), false);
        }

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));

    use('local-change', new Strategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    } , async (req: Request, email: string, password: string, done: Function) => {
      try {
        const oldPassword = req.body.oldPassword;
        const user: IUser = await this.userModel.findOne({ 'local.email': email });

        if (!user) {
          return done(new UnauthorizedException(MESSAGES.UNAUTHORIZED_INVALID_EMAIL), false);
        }

        if (generateHashedPassword(user.local.salt, oldPassword) !== user.local.hashedPassword) {
          return done(new UnauthorizedException(MESSAGES.UNAUTHORIZED_INVALID_PASSWORD), false);
        }

        await this.loggerService.logChangePass(user._id);

        await this.userModel.update(
          { _id: user._id },
          { $set: { 'local.hashedPassword': generateHashedPassword(user.local.salt, password) }}
        ).exec();

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));

    use('local-reset', new Strategy({
      usernameField: 'hash',
      passwordField: 'password',
    }, async (hash: string, password: string, done: Function) => {
      try {
        const user: IUser = await this.userModel.findOne({ 'system.resetUrl': hash });

        if (!user) {
          return done(new NotFoundException(), false);
        }

        if (user.system.resetUrlCreated > (+new Date() + 1000 * 60 * 60) ) {
          return done(new RequestTimeoutException(MESSAGES.LIFETIME_LINK_OUT), false);
        }

        await this.loggerService.logResetPass(user._id);

        const salt: string = generateSalt();
        await this.userModel.update(
          { _id: user._id },
          {
            $set: {
              'local.salt': salt,
              'local.hashedPassword': generateHashedPassword(salt, password),
              'system.resetUrl': null,
              'system.resetUrlCreated': null
            }
          }
        ).exec();

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));
  }
}
