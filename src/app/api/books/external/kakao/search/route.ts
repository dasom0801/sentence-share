import { searchBookWithKakaoOpenAPI } from '@/db/controllers';
import { handleError, parseQuery } from '@/db/utils';
import { HttpError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const { page, limit } = parseQuery(Object.fromEntries(searchParams));
    const query = searchParams.get('query');

    if (!query) {
      throw new HttpError('QUERY_IS_REQUIRED', 400);
    }

    const data = await searchBookWithKakaoOpenAPI({
      query,
      page,
      limit,
    });
    return NextResponse.json(
      {
        success: true,
        data,
        message: '책 검색 결과를 성공적으로 가져왔습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}
