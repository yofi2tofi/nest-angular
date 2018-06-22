import { Document } from 'mongoose';

interface Coinpayments {
  amount: string;
  txnId: string;
  address: string;
  time: Date;
  status: boolean;
}

export interface IUser extends Document {
  method: string;
  local: {
    email: string;
    salt: string;
    hashedPassword: string;
    roleId: string;
  };
  google: {
    id: string;
    email: string;
    displayName: string;
  };
  facebook: {
    id: string;
    email: string;
  };
  twitter: {
    id: string;
    username: string;
    displayName: string;
  };
  system: {
    refUrl: string;
    resetUrl: string;
    resetUrlCreated?: number;
  };
  refSystem: {
    refferals: number[];
    refferer: string;
  };
  balance: {
    current: number;
    income: number;
    outcome: number;
  };
  ownerships: any[];
  сontributions: any[];
  payments: {
    coinpayments: Coinpayments[];
  };
}
