import { Document } from 'mongoose';

export interface IContributionLog extends Document {
  сontribution: string;
  takeTime: number;
  closeTime: number;
  isActive: boolean;
}
