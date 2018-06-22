import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { get, post, Response } from 'request';

import {
  SERVER_CONFIG,
  USER_MODEL_TOKEN,
  FACEBOOK_CONFIG_TOKEN,
  TWITTER_CONFIG_TOKEN,
  GOOGLE_CONFIG_TOKEN,
  MESSAGES
} from '../../server.constants';
import { IUser } from '../user/interfaces/user.interface';
import { IToken } from './interfaces/token.interface';
import { IFacebookConfig } from './interfaces/facebook-config.interface';
import { ITwitterConfig } from './interfaces/twitter-config.interface';
import { IGoogleConfig } from './interfaces/google-config.interface';
import { generateSalt, generateHashedPassword, generateHashedResetUrl, generateHashedRoleId } from '../../utilities/encryption';
import { EmailerService } from '../emailer/emailer.service';

@Injectable()
export class AuthService {
  private url: string;

  constructor(
    @Inject(USER_MODEL_TOKEN) private readonly userModel: Model<IUser>,
    @Inject(FACEBOOK_CONFIG_TOKEN) private readonly fbConfig: IFacebookConfig,
    @Inject(TWITTER_CONFIG_TOKEN) private readonly twitterConfig: ITwitterConfig,
    @Inject(GOOGLE_CONFIG_TOKEN) private readonly googleConfig: IGoogleConfig,
    private readonly emailerService: EmailerService
  ) {
    this.url = `${SERVER_CONFIG.httpProtocol}://${SERVER_CONFIG.domain}:${SERVER_CONFIG.httpPort}`;
  }

  async createToken(user: IUser): Promise<IToken> {
    const expiresIn: string = '12h';
    const token: string = sign({
      sub: user.id,
      role: user.local.roleId
    }, SERVER_CONFIG.jwtSecret, {expiresIn});

    return {
      token
    };
  }

  async validateUser(payload: any): Promise<boolean> {
    const user: IUser = await this.userModel.findById(payload.sub);

    if (user) {
      return true;
    }

    return false;
  }

  async requestFacebookRedirectUri(): Promise<{redirect_uri: string}> {
    const queryParams: string[] = [
      `client_id=${this.fbConfig.client_id}`,
      `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
      `state=${this.fbConfig.state}`
    ];
    const redirect_uri: string = `${this.fbConfig.login_dialog_uri}?${queryParams.join('&')}`;

    return {
      redirect_uri
    };
  }

  async facebookSignIn(code: string): Promise<any> {
    const queryParams: string[] = [
      `client_id=${this.fbConfig.client_id}`,
      `redirect_uri=${this.fbConfig.oauth_redirect_uri}`,
      `client_secret=${this.fbConfig.client_secret}`,
      `code=${code}`
    ];
    const uri: string = `${this.fbConfig.access_token_uri}?${queryParams.join('&')}`;

    return new Promise((resolve: Function, reject: Function) => {
      get(uri, (error: Error, response: Response, body: any) => {
        if (error) {
          return reject(error);
        }

        if (body.error) {
          return reject(body.error);
        }

        const { access_token } = JSON.parse(body);

        post({
          url: `${this.url}/api/auth/facebook/token`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          form: {
            access_token
          }
        }, async (err: Error, res: Response, body: any) => {
          if (err) {
            return reject(err);
          }

          if (body.error) {
            return reject(body.error);
          }

          resolve(body);
        });
      });
    });
  }

  async requestTwitterRedirectUri(): Promise<{ redirect_uri: string } | any> {
    return new Promise((resolve: Function, reject: Function) => {
      post({
        url: this.twitterConfig.request_token_uri,
        oauth: {
          consumer_key: this.twitterConfig.consumer_key,
          consumer_secret: this.twitterConfig.consumer_secret,
          callback: this.twitterConfig.oauth_redirect_uri
        },
      }, async (err: Error, res: Response, body: any) => {
        if (err) {
          return reject(err);
        }

        if (body.error) {
          return reject(body.error);
        }

        const { oauth_token } = this.parseTwitterResponse(body);
        const redirect_uri: string = `${this.twitterConfig.login_dialog_uri}?oauth_token=${oauth_token}`;

        resolve({
          redirect_uri
        });
      });
    });
  }

  async twitterSignIn(oauth_token: string, oauth_verifier: string): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      post({
        url: this.twitterConfig.access_token_uri,
        oauth: {
          consumer_key: this.twitterConfig.consumer_key,
          consumer_secret: this.twitterConfig.consumer_secret,
          token: oauth_token,
          verifier: oauth_verifier
        }
      }, async (err: Error, res: Response, body: any) => {
        if (err) {
          return reject(err);
        }

        if (body.error) {
          return reject(body.error);
        }

        const { oauth_token, oauth_token_secret, user_id } = this.parseTwitterResponse(body);

        post({
          url: `${this.url}/api/auth/twitter/token`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          form: {
            oauth_token,
            oauth_token_secret,
            user_id
          }
        }, async (err: Error, res: Response, body: any) => {
          if (err) {
            return reject(err);
          }

          if (body.error) {
            return reject(body.error);
          }

          resolve(body);
        });
      });
    });
  }

  async requestGoogleRedirectUri(): Promise<{ redirect_uri: string } | any> {
    const queryParams: string[] = [
      `client_id=${this.googleConfig.client_id}`,
      `redirect_uri=${this.googleConfig.oauth_redirect_uri}`,
      `response_type=${this.googleConfig.response_type}`,
      `scope=${this.googleConfig.scopes.join(' ')}`
    ];
    const redirect_uri: string = `${this.googleConfig.login_dialog_uri}?${queryParams.join('&')}`;

    return {
      redirect_uri
    };
  }

  async googleSignIn(code: string): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      post({
        url: this.googleConfig.access_token_uri,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
          code,
          client_id: this.googleConfig.client_id,
          client_secret: this.googleConfig.client_secret,
          redirect_uri: this.googleConfig.oauth_redirect_uri,
          grant_type: this.googleConfig.grant_type
        }
      }, async (err: Error, res: Response, body: any) => {
        if (err) {
          return reject(err);
        }

        if (body.error) {
          return reject(body.error);
        }

        const { access_token } = JSON.parse(body);

        post({
          url: `${this.url}/api/auth/google/token`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          form: {
            access_token
          }
        }, async (err: Error, res: Response, body: any) => {
          if (err) {
            return reject(err);
          }

          if (body.error) {
            return reject(body.error);
          }

          resolve(body);
        });
      });
    });
  }

  async getResetUrl(email: string): Promise<any> {
    const user: IUser = await this.userModel.findOne({ 'local.email': email });

    if (!user) {
      return new UnauthorizedException(MESSAGES.UNAUTHORIZED_INVALID_EMAIL);
    }

    const { _id, local: { salt, hashedPassword }} = user;
    const url = generateHashedResetUrl(generateSalt(), _id.toString());

    await this.userModel.update(
      { _id },
      {
        $set: {
          'local.hashedPassword': generateHashedPassword(user.local.salt, hashedPassword),
          'system.resetUrl': url,
          'system.resetUrlCreated': +new Date()
        }
      }
    ).exec();

    // this.emailerService.sendResetMail(email, url);
  }

  private parseTwitterResponse(response: string): {[key: string]: string | boolean} {
    const regex: RegExp = /([a-z_]+?)=([a-zA-Z0-9_-]+)/g;
    const parsedResponse: {[key: string]: string} = {};

    let match: RegExpMatchArray = regex.exec(response);

    while (match) {
      match.shift();

      parsedResponse[match.shift()] = match.shift();

      match = regex.exec(response);
    }

    return parsedResponse;
  }
}
