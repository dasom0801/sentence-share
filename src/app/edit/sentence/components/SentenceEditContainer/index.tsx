import { MaxWidthWrapper } from '@/components/atoms';
import type { Sentence } from '@/types';

import { SentenceEditProvider } from '../../contexts';
import SentenceEditContent from '../SentenceEditContent';

type SentenceEditContainerProps = {
  sentence?: Sentence;
};

export default function SentenceEditContainer({
  sentence,
}: SentenceEditContainerProps) {
  return (
    <SentenceEditProvider initialSentence={sentence}>
      <MaxWidthWrapper>
        <SentenceEditContent />
      </MaxWidthWrapper>
    </SentenceEditProvider>
  );
}
