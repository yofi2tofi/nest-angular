import { Document } from 'mongoose';

export interface IUser extends Document {
  method: string;
  local: {
    email: string;
    salt: string;
    hashedPassword: string;
    roleId: number;
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
    refferals: number[],
    refferer: string
  };
  balance: {
    current: number,
    income: number,
    outcome: number
  };
}
