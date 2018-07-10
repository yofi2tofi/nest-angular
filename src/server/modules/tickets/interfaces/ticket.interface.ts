import { Document } from 'mongoose';

export interface IMessage extends Document {
  owner: string;
  timestamp: string;
  message: string;
}

export interface ITicket extends Document {
  userId: string;
  messages: IMessage[];
  status: string;
}
