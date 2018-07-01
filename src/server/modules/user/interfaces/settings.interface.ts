import { Document } from 'mongoose';

export interface ISettingsDto extends Document {
  coinpayments: string;
  coinbasesmth: string;
  [key: string]: any;
}
