const nodemailer = require('nodemailer');

import { nodemailerConfig } from './config/emailer.config';
import { MAILER_CONFIG_TOKEN } from '../../server.constants';

export const emailerProviders = {
  provide: MAILER_CONFIG_TOKEN,
  useFactory: () => nodemailer.createTransport(nodemailerConfig)
};
