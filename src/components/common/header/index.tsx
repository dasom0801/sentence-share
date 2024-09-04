import classes from './index.module.scss';
import Link from 'next/link';
import Logo from '../logo/index';
import MaxWidthWrapper from '@components/common/max-width-wrapper';
import HeaderMenu from '@components/common/HeaderMenu';

export default function Header() {
  return (
    <div className={classes.header}>
      <MaxWidthWrapper className={classes.wrapper}>
        <Link href="/">
          <Logo />
        </Link>

        <HeaderMenu />
      </MaxWidthWrapper>
    </div>
  );
}
