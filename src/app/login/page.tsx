import LoginButton from '@/components/common/LoginButton';
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper';
import classes from './page.module.scss';

type LoginPageProps = {
  searchParams: {
    afterLogin: string;
  };
};

export default function LoginPage({
  searchParams: { afterLogin },
}: LoginPageProps) {
  return (
    <MaxWidthWrapper className={classes.wrapper}>
      <p className={classes.title}>로그인 후 이용해주세요.</p>
      <LoginButton afterLogin={afterLogin} />
    </MaxWidthWrapper>
  );
}
