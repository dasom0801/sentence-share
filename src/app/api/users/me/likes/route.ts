import { getLikedSentences } from '@/db/controllers/users.controller';
import { handleError, parseQuery } from '@/db/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = parseQuery(Object.fromEntries(searchParams));
  try {
    const data = await getLikedSentences(query);
    return NextResponse.json(
      {
        success: true,
        data,
        message: '내가 좋아요한 문장을 성공적으로 가져왔습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}
