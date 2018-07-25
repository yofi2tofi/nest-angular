import { Controller, Get, Query, Res, Req, Session, Next, UseGuards, Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { CoinbaseService } from './coinbase.service';
import { AuthGuard } from '../../../guards/auth.guard';

@Controller('api/payment/coinbase')
@UseGuards(new AuthGuard())
export class CoinbaseController {

  constructor(
    private readonly coinbase: CoinbaseService
  ) {}

  @Get()
  async createTransaction(@Req() req: Request) {
    const { headers: { authorization }} = req;
    await this.coinbase.createTransaction(authorization as string);
  }

  @Get('test')
  async closeTransaction() {
    // await this.coinbase.closeTransaction('CPCF01TWXRE4JIKYVDIMFVMLMQ');
  }
}
