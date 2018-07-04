import { Schema } from 'mongoose';

export const UserSchema: Schema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook', 'twitter'],
    required: true
  },
  local: {
    confirmed: {
      type: Boolean,
      default: false
    },
    email: {type: String, lowercase: true, unique: true, sparse: true},
    salt: String,
    hashedPassword: String,
    roleId: String,
    avatar: String
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
    confirmedUrl: String,
    refUrl: String,
    resetUrl: {
      type: String,
      default: null
    },
    resetUrlCreated: Number,
    banned: Boolean
  },
  settings: {
    coinpayments: String,
    coinbasesmth: String
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
  ownerships: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Ownership'
    },
    count: {
      type: Number,
      default: 1
    },
    lastHarvest: {
      type: Number,
      default: +Date.now()
    }
  }],
  сontributions: [{
    type: Schema.Types.ObjectId,
    ref: 'ContributionLogs',
  }],
  payments: {
    coinpayments: [{
      type: Schema.Types.ObjectId,
      ref: 'Coinpayments',
    }]
  },
  dialogs: [{
    type: Schema.Types.ObjectId,
    ref: 'Dialog'
  }],
  banUser: [Schema.Types.ObjectId]
});
