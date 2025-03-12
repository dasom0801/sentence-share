import { getUserSentences } from '@/db/controllers';
import { handleError, parseQuery } from '@/db/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const query = parseQuery(Object.fromEntries(searchParams));
    const data = await getUserSentences({ userId: id, ...query });
    return NextResponse.json(
      {
        success: true,
        data,
        message: '사용자가 작성한 문장을 가져왔습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}
