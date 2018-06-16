import { Schema } from 'mongoose';

export const OwnershipSchema: Schema = new Schema({
  title: String,
  description: String,
  point: Number,
  count: Number,
  price: Number,
  gainPerHour: Number,
  lastHarvest: Number
});
