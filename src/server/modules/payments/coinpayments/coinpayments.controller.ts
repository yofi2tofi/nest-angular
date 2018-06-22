import { Controller, Get, Query, Res, Req, Session, Next, UseGuards, Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { CoinpaymentsService } from './coinpayments.service';
import { AuthGuard } from '../../../guards/auth.guard';

@Controller('api/payment')
@UseGuards(new AuthGuard())
export class CoinpaymentsController {

  constructor(
    private readonly coinpayments: CoinpaymentsService
  ) {}

  @Get('coinpayments')
  async createTransaction(@Req() req: Request) {
    const { headers: { authorization }} = req;
    await this.coinpayments.createTransaction(authorization as string);
  }

  @Get('test')
  async closeTransaction() {
    await this.coinpayments.closeTransaction('CPCF01TWXRE4JIKYVDIMFVMLMQ');
  }
}
