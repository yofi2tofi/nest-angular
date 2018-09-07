import { Controller, Get, Res, Req, Param, UseGuards, Next, Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

import { PaymentsService } from './payments.service';

@Controller('api/payment')
@UseGuards(new AuthGuard())
export class PaymentsController {

  constructor(
    private readonly paymentsService: PaymentsService
  ) {}

  @Get('all/:id')
  @UseGuards(RolesGuard)
  async getAllTransactions(@Param('id') id: string) {
    return await this.paymentsService.getAllTransactions(id);
  }
}
