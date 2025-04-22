import HeaderMenu from '@/components/common/HeaderMenu';
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper';
import Link from 'next/link';
import { Suspense } from 'react';
import Logo from '../Logo';
import classes from './Header.module.scss';

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
