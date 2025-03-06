import { Schema, model, models } from 'mongoose';

const BookSchema = new Schema({
  title: { type: String, required: true },
  coverUrl: {
    type: String,
  },
  publisher: { type: String, required: true },
  author: { type: [String], required: true },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  publishedAt: { type: Date, default: Date.now },
});

export default models.book || model('book', BookSchema);
