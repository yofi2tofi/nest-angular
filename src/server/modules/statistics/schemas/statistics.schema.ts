import { Schema } from 'mongoose';

const StatisticsSchema: Schema = new Schema({
  userId: Schema.Types.ObjectId,
  email: String,
  local: {
    email: String
  },
  balance: {
    current: Number
  }
});

export const StatisticsLogSchema: Schema = new Schema({
  users: [StatisticsSchema]
}, { timestamps: true });
