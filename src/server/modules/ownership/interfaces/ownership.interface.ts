import { Document } from 'mongoose';

export interface IOwnership extends Document {
  title: string;
  description: string;
  point: number;
  count: number;
  price: number;
  gainPerHour: number;
  lastHarvest: number;
}
