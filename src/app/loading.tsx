import SentenceListSkeleton from '@components/sentence/sentence-list-skeleton';
import MaxWidthWrapper from '@components/common/max-width-wrapper';

export default function MainLoading() {
  return (
    <main>
      <MaxWidthWrapper>
        <SentenceListSkeleton />
      </MaxWidthWrapper>
    </main>
  );
}
