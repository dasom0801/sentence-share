import { TbZoomQuestion } from 'react-icons/tb';
import classes from './index.module.scss';

type NoResultProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export default function NoResult({
  title,
  description,
  children,
}: NoResultProps) {
  return (
    <div className={classes.noResult}>
      <TbZoomQuestion />
      <div className={classes.title}>{title}</div>
      {description && <div className={classes.description}>{description}</div>}

      {children && <div className={classes.actions}>{children}</div>}
    </div>
  );
}
