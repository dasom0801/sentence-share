import classes from './index.module.scss';

type SentenceTextCardProps = {
  text: string;
  bookTitle: string;
  bookAuthor: string[];
};

export default function SentenceTextCard({
  text,
  bookTitle,
  bookAuthor,
}: SentenceTextCardProps) {
  return (
    <div className={classes.card}>
      <p>{text}</p>
      <div>
        {bookTitle} - {bookAuthor?.join(',')}
      </div>
    </div>
  );
}
