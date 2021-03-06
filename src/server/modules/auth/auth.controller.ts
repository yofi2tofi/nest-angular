import { Controller, Post, Param, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { IToken } from './interfaces/token.interface';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('confirm/:id')
  async confirmMail(@Param('id') id: string, @Req() req: Request) {
    return await this.authService.confirmMail(id);
  }

  @Post('local/signup')
  async requestJsonWebTokenAfterLocalSignUp(@Req() req: Request): Promise<IToken> {
    return await this.authService.createToken(req.user);
  }

  @Post('local/signin')
  async requestJsonWebTokenAfterLocalSignIn(@Req() req: Request): Promise<IToken> {
    return await this.authService.createToken(req.user);
  }

  @Post('local/0958235789sd7fg9as07fas90d8f7')
  async requestJsonWebTokenAfterLocalAdminSignIn(@Req() req: Request): Promise<IToken> {
    return await this.authService.createToken(req.user);
  }

  @Post('local/change-password')
  async requestJsonWebTokenAfterLocalChangePass(@Req() req: Request): Promise<IToken> {
    return await this.authService.createToken(req.user);
  }

  @Get('facebook/uri')
  async requestFacebookRedirectUrl(): Promise<{redirect_uri: string}> {
    return await this.authService.requestFacebookRedirectUri();
  }

  @Post('facebook/signin')
  async facebookSignIn(@Req() req: Request): Promise<IToken> {
    return await this.authService.facebookSignIn(req.body.code);
  }

  @Post('facebook/token')
  async requestJsonWebTokenAfterFacebookSignIn(@Req() req: Request): Promise<IToken> {
    return await this.authService.createToken(req.user);
  }

  @Get('twitter/uri')
  async requestTwitterRedirectUri(): Promise<any> {
    return await this.authService.requestTwitterRedirectUri();
  }

  @Post('twitter/signin')
  async twitterSignIn(@Req() req: Request): Promise<any> {
    return await this.authService.twitterSignIn(req.body.oauth_token, req.body.oauth_verifier);
  }

  @Post('twitter/token')
  async requestJsonWebTokenAfterTwitterSignIn(@Req() req: Request): Promise<IToken> {
    return await this.authService.createToken(req.user);
  }

  @Get('google/uri')
  async requestGoogleRedirectUri(): Promise<any> {
    return await this.authService.requestGoogleRedirectUri();
  }

  @Post('google/signin')
  async googleSignIn(@Req() req: Request): Promise<any> {
    return await this.authService.googleSignIn(req.body.code);
  }

  @Post('google/token')
  async requestJsonWebTokenAfterGoogleSignIn(@Req() req: Request): Promise<IToken> {
    return await this.authService.createToken(req.user);
  }

  @Post('reset')
  async resetPasswordLink(@Req() req: Request): Promise<string> {
    return await this.authService.getResetUrl(req.body.email);
  }

  @Post('reset/:id')
  resetPassword(@Req() req: Request): boolean {
    return true;
  }

  @Get('authorized')
  public async authorized() {
    console.log('Authorized route...');
  }
}
