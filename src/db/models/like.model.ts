import { Schema, model, models } from 'mongoose';

const LikeSchema = new Schema(
  {
    category: { type: String, required: true, default: 'sentence' },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    target: {
      type: Schema.Types.ObjectId,
      refPath: 'category',
    },
  },
  { timestamps: true },
);

LikeSchema.index({ user: 1, target: 1, category: 1 }, { unique: true });

export default models?.like || model('like', LikeSchema);
