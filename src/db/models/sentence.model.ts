import { Schema, model, models } from 'mongoose';

const SentenceSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'book',
      required: true,
    },
  },
  { timestamps: true },
);

SentenceSchema.index({ book: 1 });
SentenceSchema.index({ author: 1, book: 1 });

export default models?.sentence || model('sentence', SentenceSchema);
