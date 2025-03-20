import { getUserLikedSentences } from '@/db/controllers/users.controller';
import { handleError, parseQuery } from '@/db/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id: userId } = params;
    const { searchParams } = new URL(req.url);
    const query = parseQuery(Object.fromEntries(searchParams));
    const data = await getUserLikedSentences({ userId, ...query });
    return NextResponse.json(
      {
        success: true,
        data,
        message: '사용자가 작성한 문장을 성공적으로 가져왔습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}
