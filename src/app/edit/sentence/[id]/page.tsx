import { getSentence } from '@/lib/api';
import SentenceEditContainer from '../_components/sentence-edit-container';

type SentenceEditPageProps = {
  params: { id: string };
};

export default async function SentenceEditPage({
  params: { id },
}: SentenceEditPageProps) {
  const sentence = await getSentence({ sentenceId: id });
  return <SentenceEditContainer sentence={sentence} />;
}
