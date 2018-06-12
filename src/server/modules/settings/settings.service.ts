import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { SETTINGS_MODEL_TOKEN } from '../../server.constants';
import { ISettings } from './interfaces/settings.interface';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(SETTINGS_MODEL_TOKEN) private readonly settingsModel: Model<ISettings>
  ) {}
}
