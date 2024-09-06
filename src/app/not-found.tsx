import { TbError404 } from 'react-icons/tb';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import classes from './not-found.module.scss';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={classes.notFound}>
      <TbError404 />
      <div className={classes.title}>페이지를 찾을 수 없습니다.</div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => router.back()}
      >
        뒤로 가기
      </Button>
    </div>
  );
}
