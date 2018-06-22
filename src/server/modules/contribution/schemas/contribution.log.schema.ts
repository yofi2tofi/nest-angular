import { Schema } from 'mongoose';

export const ContributionLogSchema: Schema = new Schema({
  сontribution: [{
    type: Schema.Types.ObjectId,
    ref: 'Contribution',
  }],
  foundation: Number,
  takeTime: Number,
  closeTime: Number,
  isActive: Boolean
});
