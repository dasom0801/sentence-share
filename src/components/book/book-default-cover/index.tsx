import { CiImageOn } from 'react-icons/ci';
import classes from './index.module.scss';

export default function BookDefaultCover() {
  return (
    <div className={classes.cover} aria-hidden={true}>
      <CiImageOn />
    </div>
  );
}
