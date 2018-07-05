const cronJob = require('cron').CronJob;

import { CRONJOB_MODEL_TOKEN, DB_CONNECTION_TOKEN } from '../../server.constants';

export const CronjobProviders = [
  {
    provide: CRONJOB_MODEL_TOKEN,
    useFactory: () => cronJob,
  }
];
