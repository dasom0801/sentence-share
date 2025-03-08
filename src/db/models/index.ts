import mongoose from 'mongoose';
import Book from './book.model';
import Like from './like.model';
import Sentence from './sentence.model';
import User from './user.model';

// 등록할 모델 리스트
const models = { Book, Sentence, Like, User };

/**
 * 모델 등록하기
 */
export function registerModels() {
  Object.entries(models).forEach(([name, model]) => {
    if (!mongoose.models[name]) {
      mongoose.model(name, model.schema);
    }
  });
}

export default models;
