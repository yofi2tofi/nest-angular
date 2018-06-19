import { Document } from 'mongoose';

export interface ISettings extends Document {
  id: number;
  refUrl: string;
  currencies: {
    usd: number,
    btc: number
  };
  refSystem: {
    refill: {
      type: string,
      options: string[]
    },
    contribution: {
      type: string,
      options: string[]
    },
    charging: {
      type: string,
      options: string[]
    }
  };
}
