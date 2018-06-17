import { Document } from 'mongoose';

interface Grage extends Document {
  level: number;
  point: number;
  count: number;
  price: number;
  gainPerHour: number;
}

export interface IOwnership extends Document {
  title: string;
  description: string;
  lastHarvest: number;
  system: {
    awailable: boolean
  };
  grade: Grage[];
}
