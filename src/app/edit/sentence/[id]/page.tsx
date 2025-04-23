import { getSentence } from '@/lib/api';
import { SentenceEditContainer } from '../components';

type SentenceEditPageProps = {
  params: { id: string };
};

export default async function SentenceEditPage({
  params: { id },
}: SentenceEditPageProps) {
  const { data: sentence } = await getSentence({ sentenceId: id });
  return <SentenceEditContainer sentence={sentence} />;
}
