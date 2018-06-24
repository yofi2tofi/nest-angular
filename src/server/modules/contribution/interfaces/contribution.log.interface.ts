import { Document } from 'mongoose';

export interface IContributionLog<T> extends Document {
  сontribution: T;
  foundation: number;
  takeTime: number;
  closeTime: number;
  isActive: boolean;
}
