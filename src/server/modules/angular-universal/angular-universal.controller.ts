import { Controller, Get, Res, Req, Query, Session, Next, Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { join } from 'path';

import { ANGULAR_UNIVERSAL_OPTIONS } from './angular-universal.constants';
import { IAngularUniversalOptions } from './interfaces/angular-universal-options.interface';
import { AngularUniversalService } from './angular-universal.service';

@Controller()
export class AngularUniversalController {
  constructor(
    @Inject(ANGULAR_UNIVERSAL_OPTIONS) private readonly ngOptions: IAngularUniversalOptions,
    private angularUniversalService: AngularUniversalService
  ) {}

  @Get('*')
  async setReffer(@Query() query: any, @Session() session: any, @Next() next: NextFunction) {
    await this.angularUniversalService.getReffer(query, session);
    next();
  }

  @Get('*')
  render(@Res() res: Response, @Req() req: Request) {
    res.render(join(this.ngOptions.viewsPath, 'index.html'), { req });
  }
}
