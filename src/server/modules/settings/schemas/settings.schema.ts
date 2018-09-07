import { Schema } from 'mongoose';

export const SettingsSchema: Schema = new Schema({
  id: {
    type: Number,
    required: true
  },
  refUrl: {
    type: String,
    required: true
  },
  currencies: {
    usd: Number,
    btc: Number
  },
  tickets: {
    type: Array,
    default: ['income', 'withdrow', 'bugs', 'improve']
  },
  refSystem: {
    refill: {
      type: {
        type: String,
        enum: ['classic', 'modern'],
        default: 'classic'
      },
      options: {
        type: Array,
        default: ['10', '5']
      }
    },
    contribution: {
      type: {
        type: String,
        enum: ['classic', 'modern'],
        default: 'classic'
      },
      options: {
        type: Array,
        default: ['10', '5']
      }
    },
    charging: {
      type: {
        type: String,
        enum: ['classic', 'modern'],
        default: 'classic'
      },
      options: {
        type: Array,
        default: ['10', '5']
      }
    }
  }
});
