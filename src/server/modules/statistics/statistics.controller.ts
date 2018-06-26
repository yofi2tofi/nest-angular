import { Controller, Query, UseGuards, Get, Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { StatisticsService } from './statistics.service';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('api/statistics')
@UseGuards(new AuthGuard())
export class SettingsController {
  constructor(
    private readonly statisticsService: StatisticsService
  ) {}

  @Get('day')
  async getDayStatistics(@Query('period') period: number) {
    return await this.statisticsService.getStatistics(period);
  }
}
