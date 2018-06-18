import { Controller, All, Res, Req, UseGuards, Next, Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { AuthGuard } from '../../guards/auth.guard';

@Controller('api/payment')
@UseGuards(new AuthGuard())
export class PaymentsController {

  @All('*')
  all(@Res() res: Response, @Req() req: Request, @Next() next: NextFunction) {
    next();
  }
}
