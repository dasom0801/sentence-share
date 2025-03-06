import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    provider: {
      type: String,
      required: true,
      enum: ['google', 'email'],
    },
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    profileUrl: { type: String },
  },
  { timestamps: true },
);

export default models?.user || model('user', UserSchema);
