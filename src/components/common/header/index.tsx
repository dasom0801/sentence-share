import classes from './index.module.scss';
import Link from 'next/link';
import Logo from '../logo/index';
import MaxWidthWrapper from '@components/common/max-width-wrapper';
import HeaderMenu from '@components/common/header-menu';
import { Suspense } from 'react';

export default function Header() {
  return (
    <div className={classes.header}>
      <MaxWidthWrapper className={classes.wrapper}>
        <Link href="/">
          <Logo />
        </Link>

        <Suspense fallback={null}>
          <HeaderMenu />
        </Suspense>
      </MaxWidthWrapper>
    </div>
  );
}
