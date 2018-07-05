import { Document } from 'mongoose';

interface StatisticsSchema {
  userId: string;
  email: string;
  current: number;
}

export interface IStatisticsLogSchema extends Document {
  data: Date;
  users: StatisticsSchema[];
}
