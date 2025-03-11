import { addLike } from '@/db/controllers';
import { handleError } from '@/db/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { category, target } = await req.json();
    await addLike({ category, target });
    return NextResponse.json(
      { success: true, data: null, message: '좋아요를 추가했습니다.' },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}
