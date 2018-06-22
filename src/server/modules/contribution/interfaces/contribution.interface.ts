import { Document } from 'mongoose';

export interface IContribution extends Document {
  min: number;
  max: number;
  bonus: number;
  accruals: number;
  duration: number;
  round: number;
  back: number;
  withdraw: {
    access: boolean;
    penalty: number;
    duration: number;
  };
}
