'use client';

import { memo } from 'react';
import { useLogin } from './hooks';

type LoginButtonProps = {
  afterLogin?: string;
};

const LoginButton: React.FC<LoginButtonProps> = memo(function LoginButton({
  afterLogin,
}: LoginButtonProps) {
  const { mutate } = useLogin(afterLogin);

  return (
    <button onClick={() => mutate()} aria-label="continue with google">
      <img
        src="/images/google-ctn.svg"
        alt="continue with google"
        aria-hidden="true"
      />
    </button>
  );
});
export default LoginButton;
