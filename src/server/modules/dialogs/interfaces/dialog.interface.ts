import { Document } from 'mongoose';

export interface IMessage {
  owner: string;
  receiver: string;
  timestamp?: Date;
  message: string;
}

export interface IDialog extends Document {
  chat: string;
  ids: string[];
  messages: IMessage[];
}
