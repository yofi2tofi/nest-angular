import { Injectable, Inject } from '@nestjs/common';

import { CRONJOB_MODEL_TOKEN } from '../../server.constants';
import { ContributionService } from '../contribution/contribution.service';

@Injectable()
export class CronjobService {
  constructor(
    @Inject(CRONJOB_MODEL_TOKEN) private readonly cronJob: any,
    private readonly contributionService: ContributionService
  ) {
    this.startContributionCronjob();
  }

  private startContributionCronjob(): void {
    try {
      new this.cronJob({
        cronTime: '00 30 * * * *',
        onTick: () => this.processContributionCronjob(),
        start: true,
        timeZone: 'Europe/Moscow'
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async processContributionCronjob(): Promise<any> {
    return await this.contributionService.cronContributionElement();
  }
}
