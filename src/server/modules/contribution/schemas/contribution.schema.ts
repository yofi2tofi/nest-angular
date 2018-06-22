const autoincrement = require('simple-mongoose-autoincrement');

import { Schema } from 'mongoose';

export const ContributionSchema: Schema = new Schema({
  min: {
    type: Number
  },
  max: {
    type: Number
  },
  bonus: {
    type: Number
  },
  accruals: {
    type: Number
  },
  duration: {
    type: Number
  },
  round: {
    type: Number,
    default: 1
  },
  back: {
    type: Number
  },
  withdraw: {
    access: Boolean,
    penalty: Number,
    duration: Number
  }
});

ContributionSchema.plugin(autoincrement, {
  field: 'id',
  startAt: 0,
  incrementBy: 1
});
