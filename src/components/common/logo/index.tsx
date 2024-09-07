import classes from './index.module.scss';
import { BiBookHeart } from 'react-icons/bi';

export default function Logo() {
  return (
    <div className={classes.logo}>
      <BiBookHeart />
      <span>SentenceShare</span>
    </div>
  );
}
