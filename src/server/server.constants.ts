import { Config, IEnvironmentConfig } from './config/config';

const env = process.env.NODE_ENV || 'development';

export const SERVER_CONFIG: IEnvironmentConfig = Config[env];

export const DB_CONNECTION_TOKEN: string = 'DbConnectionToken';
export const DB_SESSION_TOKEN: string = 'DbSessionToken';
export const DB_AUTOINCREMENT_TOKEN: string = 'DbAutoincrementToken';
export const SERVER_CONFIG_TOKEN: string = 'ServerConfigToken';

export const USER_MODEL_TOKEN: string = 'UserModelToken';
export const SETTINGS_MODEL_TOKEN: string = 'SettingsModelToken';
export const OWNERSHIP_MODEL_TOKEN: string = 'OwnershipModelToken';
export const CONTRIBUTION_MODEL_TOKEN: string = 'ContributionModelToken';
export const CONTRIBUTIONLOGS_MODEL_TOKEN: string = 'ContributionLogsModelToken';
export const CRONJOB_MODEL_TOKEN: string = 'CronjobModelToken';
export const DIALOGS_MODEL_TOKEN: string = 'DialogsModelToken';
export const STATISTICS_MODEL_TOKEN: string = 'StatisticsModelToken';
export const LOGS_MODEL_TOKEN: string = 'LogsModelToken';

export const COINPAYMENTS_MODEL_TOKEN: string = 'CoinpaymentsModelToken';
export const COINPAYMENTS_POLLING_TOKEN: string = 'CoinpaymentsPollingToken';
export const COINPAYMENTS_PAYMENT_TOKEN: string = 'CoinpaymentsPaymentToken';
export const COINBASE_MODEL_TOKEN: string = 'CoinbaseModelToken';
export const COINBASE_PAYMENT_TOKEN: string = 'CoinbasePaymentToken';

export const FACEBOOK_CONFIG_TOKEN: string = 'FacebookConfigToken';
export const TWITTER_CONFIG_TOKEN: string = 'TwitterConfigToken';
export const GOOGLE_CONFIG_TOKEN: string = 'GoogleConfigToken';
export const MAILER_CONFIG_TOKEN: string = 'MailerConfigToken';

export const MESSAGES = {
  UNAUTHORIZED_EMAIL_IN_USE: 'The email already exists',
  UNAUTHORIZED_INVALID_PASSWORD: 'Invalid password',
  UNAUTHORIZED_INVALID_EMAIL: 'The email does not exist',
  UNAUTHORIZED_UNRECOGNIZED_BEARER: 'Unrecognized bearer of the token',
  LIFETIME_LINK_OUT: 'The lifetime of reset link is over'
};
