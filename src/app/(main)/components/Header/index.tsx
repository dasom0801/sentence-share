import { MaxWidthWrapper } from '@/components/atoms';
import Link from 'next/link';
import { Suspense } from 'react';
import classes from './Header.module.scss';
import HeaderMenu from './HeaderMenu';
import Logo from './Logo';

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
