import { Schema } from 'mongoose';

const Message: Schema = new Schema({
  owner: Schema.Types.ObjectId,
  receiver: Schema.Types.ObjectId,
  timestamp: {
    type: Date,
    default: Date.now()
  },
  message: String
});

export const DialogSchema: Schema = new Schema({
  chat: {
    type: String,
    unique: true
  },
  ids: [Schema.Types.ObjectId],
  messages: [Message]
});
