import { Document } from 'mongoose';

export interface ICoinpayments extends Document {
  amount: string;
  txnId: string;
  userId: string;
  address: string;
  time: Date;
  status: boolean;
}
