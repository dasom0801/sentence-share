import { BiBookHeart } from 'react-icons/bi';
import classes from './Logo.module.scss';

export default function Logo() {
  return (
    <div className={classes.logo}>
      <BiBookHeart />
      <span>SentenceShare</span>
    </div>
  );
}
