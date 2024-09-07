import classes from './page.module.scss';
import LoginButton from '@components/common/login-button';
import MaxWidthWrapper from '@components/common/max-width-wrapper';

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
