import { Controller, Get, Query, Res, Req, Session, Next, Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { CoinpaymentsService } from './coinpayments.service';

@Controller('api/payment')
export class CoinpaymentsController {

  constructor(
    private readonly coinpayments: CoinpaymentsService
  ) {}

  @Get('coinpayments')
  async createTransaction() {
    await this.coinpayments.createTransaction();
  }
}
