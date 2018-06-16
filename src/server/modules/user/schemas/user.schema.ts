import { Schema } from 'mongoose';

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
    roleId: {
      type: Number,
      default: 0
    }
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
  }
});
