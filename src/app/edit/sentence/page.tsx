import { Metadata } from 'next';
import { SentenceEditContainer } from './components';

export const metadata: Metadata = {
  title: '작성하기 - Sentence Share',
};

export default function SentencePostPage() {
  return (
    <main>
      <SentenceEditContainer />
    </main>
  );
}
