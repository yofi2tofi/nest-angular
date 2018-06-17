import { Controller, UseGuards, Inject } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import { SettingsService } from './settings.service';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('api/settings')
@UseGuards(new AuthGuard())
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService
  ) {}
}
