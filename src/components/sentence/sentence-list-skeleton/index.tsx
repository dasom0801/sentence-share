import SentenceCardSkeleton from '@components/sentence/sentence-card-skeleton';

type SentenceListSkeletonProps = {
  length?: number;
};

export default function SentenceListSkeleton({
  length = 12,
}: SentenceListSkeletonProps) {
  return (
    <ul className="grid-container">
      {Array.from({ length }).map((_, index) => (
        <li key={index}>
          <SentenceCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
