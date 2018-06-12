import { Schema } from 'mongoose';

export const SettingsSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true
  },
  refUrl: {
    type: String
  }
});
