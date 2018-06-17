import { Injectable, UnauthorizedException, NotFoundException, RequestTimeoutException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { use } from 'passport';
import { Strategy } from 'passport-local';
import { Request } from 'express';

import { IUser } from '../../user/interfaces/user.interface';
import { generateHashedPassword, generateSalt, generateHashedRefUrl } from '../../../utilities/encryption';
import { MESSAGES, USER_MODEL_TOKEN } from '../../../server.constants';

@Injectable()
export class LocalStrategy {
  constructor(
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>
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
        const user: IUser = new this.userModel({
          method: 'local',
          local: {
            email,
            salt,
            hashedPassword: generateHashedPassword(salt, password)
          },
          system: {
            refUrl: generateHashedRefUrl(salt, email)
          },
          refSystem: {
            refferer
          }
        });

        if (refferer) {
          await this.userModel.update(
            { _id: refferer },
            { $push: {
              'refSystem.refferals': user._id
            }}
          ).exec();
        }

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
