import { useLogin } from '@/lib/hooks';

const LoginButton = () => {
  const { mutate } = useLogin();

  return (
    <button onClick={() => mutate()} aria-label='continue with google'>
      <img
        src='/images/google-ctn.svg'
        alt='continue with google'
        aria-hidden='true'
      />
    </button>
  );
};
export default LoginButton;
