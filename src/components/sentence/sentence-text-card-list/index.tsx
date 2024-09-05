import Link from 'next/link';
import SentenceTextCard from '@components/sentence/sentenct-text-card';
import classes from './index.module.scss';

type SentenceTextCardListProps = {
  sentences: Sentence[];
};

export default function SentenceTextCardList({
  sentences,
}: SentenceTextCardListProps) {
  return (
    <ul className={classes.list}>
      {sentences.map((sentence: Sentence) => {
        return (
          <li key={sentence._id}>
            <Link href={`/sentence/${sentence._id}`}>
              <SentenceTextCard
                text={sentence.content}
                bookTitle={sentence.book.title}
                bookAuthor={sentence.book.author}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
