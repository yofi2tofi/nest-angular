import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
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
      passwordField: 'password'
    }, async (email: string, password: string, done: Function) => {
      try {
        if (await this.userModel.findOne({ 'local.email': email })) {
          return done(new UnauthorizedException(MESSAGES.UNAUTHORIZED_EMAIL_IN_USE), false);
        }

        const salt: string = generateSalt();
        const user: IUser = new this.userModel({
          method: 'local',
          local: {
            email,
            salt,
            hashedPassword: generateHashedPassword(salt, password)
          },
          refUrl: generateHashedRefUrl(salt, email)
        });

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

        this.userModel.update(
          { _id: user._id },
          { local: { $set: { hashedPassword: generateHashedPassword(user.local.salt, password)}}}
        );

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));
  }
}
