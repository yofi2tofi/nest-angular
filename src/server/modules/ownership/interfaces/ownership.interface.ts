import { Document } from 'mongoose';

// interface Grage extends Document {
//   level: number;
//   point: number;
//   count: number;
//   price: number;
//   gainPerHour: number;
// }

export interface IOwnership extends Document {
  title: string;
  description: string;
  lastHarvest: number;
  updateAt?: Date;
  createAt?: Date;
  system: {
    awailable: boolean
  };
  level: number;
  point: number;
  count: number;
  price: number;
  gainPerHour: number;
}
