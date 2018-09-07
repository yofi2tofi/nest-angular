import { Controller, Get, Param, UseGuards, Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { LoggerService } from './logger.service';

import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

@Controller('api/logs')
@UseGuards(new AuthGuard())
export class LoggerController {
  constructor(
    private readonly loggerService: LoggerService
  ) {}

  @Get('all/:id')
  @UseGuards(RolesGuard)
  async getAllLogs(@Param('id') id: string) {
    return await this.loggerService.getAllLogs(id);
  }
}
