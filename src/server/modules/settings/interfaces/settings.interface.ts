import { Document } from 'mongoose';

export interface ISettings extends Document {
  id: number;
  refUrl: string;
}