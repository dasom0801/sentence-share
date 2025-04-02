import { getBookSentences } from '@/db/controllers';
import { handleError, parseQuery } from '@/db/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const { searchParams } = new URL(req.url);
  const { page, limit } = parseQuery(Object.fromEntries(searchParams));
  const mine: boolean = searchParams.get('mine') === '1';
  try {
    const data = await getBookSentences({ bookId: id, page, limit, mine });
    return NextResponse.json(
      {
        success: true,
        data,
        message: '문장 목록을 성공적으로 가져왔습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}
