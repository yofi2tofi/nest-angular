import { Injectable, Inject } from '@nestjs/common';

import { CRONJOB_MODEL_TOKEN } from '../../server.constants';

import { ContributionService } from '../contribution/contribution.service';
import { StatisticsService } from '../statistics/statistics.service';

@Injectable()
export class CronjobService {
  constructor(
    @Inject(CRONJOB_MODEL_TOKEN) private readonly cronJob: any,
    private readonly contributionService: ContributionService,
    private readonly statisticsService: StatisticsService,
  ) {
    this.startContributionCronjob();
    this.startStatisticsCronjob();
  }

  /**
   * Запускает крон для планов
   */
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

  /**
   * Адаптер для сервиса планов
   */
  public async processContributionCronjob(): Promise<any> {
    return await this.contributionService.cronContributionElement();
  }

  /**
   * Запускает крон для планов
   */
  private startStatisticsCronjob(): void {
    try {
      new this.cronJob({
        cronTime: '00 00 0-23 * * *',
        onTick: () => this.processStatisticsCronjob(),
        start: true,
        timeZone: 'Europe/Moscow'
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Адаптер для сервиса статистики
   */
  public async processStatisticsCronjob(): Promise<any> {
    return await this.statisticsService.gatherStatistics();
  }
}
