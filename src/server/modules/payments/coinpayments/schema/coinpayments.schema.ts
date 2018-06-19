import { Schema } from 'mongoose';

export const CoinpaymentsSchema: Schema = new Schema({
  amount: String,
  txnId: String,
  address: String,
  userId: String,
  status: {
    type: Boolean,
    default: false
  },
  time: {
    type: Date,
    default: Date.now()
  }
});
