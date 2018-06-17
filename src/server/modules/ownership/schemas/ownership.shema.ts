import { Schema } from 'mongoose';

const GrageSchema: Schema = new Schema ({
  level: Number,
  point: Number,
  count: Number,
  price: Number,
  gainPerHour: Number
});

export const OwnershipSchema: Schema = new Schema({
  title: String,
  description: String,
  lastHarvest: Number,
  system: {
    awailable: Boolean
  },
  grade: [GrageSchema]
});
