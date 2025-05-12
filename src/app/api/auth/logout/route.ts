import { handleError } from '@/db/utils';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete('access_token');

    return NextResponse.json(
      {
        success: true,
        data: null,
        message: '성공적으로 로그아웃했습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}
