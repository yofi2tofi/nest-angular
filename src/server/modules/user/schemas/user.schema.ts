import { Schema } from 'mongoose';

const Coinpayments: Schema = new Schema({
  amount: String,
  txnId: String,
  address: String,
  status: {
    type: Boolean,
    default: false
  },
  time: {
    type: Date,
    default: Date.now()
  }
});

export const UserSchema: Schema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook', 'twitter'],
    required: true
  },
  local: {
    email: {type: String, lowercase: true, unique: true, sparse: true},
    salt: String,
    hashedPassword: String,
    roleId: String
  },
  google: {
    id: String,
    email: String,
    displayName: String
  },
  facebook: {
    id: String,
    email: String
  },
  twitter: {
    id: String,
    username: String,
    displayName: String
  },
  system: {
    refUrl: String,
    resetUrl: {
      type: String,
      default: null
    },
    resetUrlCreated: Number
  },
  refSystem: {
    refferals: {
      type: Array,
      default: []
    },
    refferer: String
  },
  balance: {
    current: {
      type: Number,
      default: 0
    },
    income: {
      type: Number,
      default: 0
    },
    outcome: {
      type: Number,
      default: 0
    }
  },
  payments: {
    coinpayments: [Coinpayments]
  }
});
