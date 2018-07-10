const autoincrement = require('simple-mongoose-autoincrement');

import { Schema } from 'mongoose';

const Message: Schema = new Schema({
  owner: Schema.Types.ObjectId,
  timestamp: {
    type: Date,
    default: Date.now()
  },
  message: String
});

export const TicketSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [Message],
  status: {
    type: String,
    enum: ['open', 'close', 'wait'],
    required: true
  },
});

TicketSchema.plugin(autoincrement, {
  field: 'tickerId',
  startAt: 101,
  incrementBy: 10
});
