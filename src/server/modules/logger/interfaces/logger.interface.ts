import { Document } from 'mongoose';

interface Log {
  date: Date;
  info: string;
}

export interface ILogger extends Document {
  userId: string;
  logs: Log[];
}
