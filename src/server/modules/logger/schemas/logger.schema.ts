import { Schema } from 'mongoose';

const LogSchema: Schema = new Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  info: String
});

export const LoggerSchema: Schema = new Schema({
  userId: String,
  logs: [LogSchema]
});
