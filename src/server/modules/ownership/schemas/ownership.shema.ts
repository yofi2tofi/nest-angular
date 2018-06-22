const autoincrement = require('simple-mongoose-autoincrement');

import { Schema } from 'mongoose';

// const GrageSchema: Schema = new Schema ({
//   level: Number,
//   point: Number,
//   count: Number,
//   price: Number,
//   gainPerHour: Number
// });

export const OwnershipSchema: Schema = new Schema({
  title: String,
  description: String,
  lastHarvest: Number,
  system: {
    awailable: Boolean
  },
  // grade: {
  //   type: [GrageSchema],
  //   required: true
  // },
  level: Number,
  point: Number,
  count: Number,
  price: Number,
  gainPerHour: Number
});

OwnershipSchema.plugin(autoincrement, {
  field: 'id',
  startAt: 0,
  incrementBy: 1
});
