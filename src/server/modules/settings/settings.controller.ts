import { Controller, Get, Query, Res, Req, Session, Next, Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { SettingsService } from './settings.service';

@Controller()
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService
  ) {}

  @Get('*')
  async setReffer(@Query() query: any, @Session() session: any, @Next() next: NextFunction) {
    await this.settingsService.getReffer(query, session);
    next();
  }
}
