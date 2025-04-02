import type { Sentence } from '@/types';
import LikeButton from '@components/common/like-button';
import SentenceCard from '@components/sentence/sentence-card';
import classes from './index.module.scss';

type SentenceCardListProps = {
  list: Sentence[];
  showBook?: boolean;
};

export default function SentenceLikeCardList({
  list,
  showBook,
}: SentenceCardListProps) {
  return (
    <ul className="grid-container">
      {list.map((sentence) => (
        <li key={sentence._id} className={classes.listItem}>
          <SentenceCard sentence={sentence} showBook={showBook}>
            <LikeButton isLiked={!!sentence.isLiked} id={sentence._id} />
          </SentenceCard>
        </li>
      ))}
    </ul>
  );
}
