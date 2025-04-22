import { CgSpinner } from 'react-icons/cg';
import classes from './Spinner.module.scss';

export default function Spinner() {
  return (
    <div className={classes.spinner}>
      <CgSpinner />
    </div>
  );
}
