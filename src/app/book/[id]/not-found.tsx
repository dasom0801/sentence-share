'use client';

import { NotFound } from '@/components/organisms';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();
  const handleGoToList = () => {
    router.push('/');
  };

  return (
    <NotFound>
      <Button variant="contained" color="secondary" onClick={handleGoToList}>
        목록으로
      </Button>
    </NotFound>
  );
}
