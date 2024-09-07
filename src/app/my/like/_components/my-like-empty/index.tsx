'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import NoResult from '@components/common/no-result';

export default function MyLikeEmpty() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <NoResult
      title="문장이 없습니다."
      description="다른 사람들이 공유한 책 속의 문장을 확인해 보세요!"
    >
      <Button variant="contained" onClick={handleClick}>
        목록 보기
      </Button>
    </NoResult>
  );
}
