'use client';

import { NoResult } from '@/components';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function MySentenceEmpty() {
  const router = useRouter();
  const handleOnClick = () => {
    router.push('/edit/sentence');
  };

  return (
    <NoResult
      title="문장이 없습니다."
      description="내가 좋아하는 책 속의 문장을 모두와 공유해보세요."
    >
      <Button onClick={handleOnClick} variant="contained">
        작성하기
      </Button>
    </NoResult>
  );
}
