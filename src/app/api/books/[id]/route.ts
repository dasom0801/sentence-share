import { getBook } from '@/db/controllers';
import { handleError } from '@/db/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const data = await getBook(id);
    return NextResponse.json(
      {
        success: true,
        data,
        message: '책 정보를 성공적으로 가져왔습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}
