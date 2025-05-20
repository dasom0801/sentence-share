import { createSentence, getSentences } from '@/db/controllers';
import { handleError, parseQuery } from '@/db/utils';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = parseQuery(Object.fromEntries(searchParams));
  try {
    const data = await getSentences(query);
    return NextResponse.json(
      { success: true, data, message: '문장 목록을 성공적으로 가져왔습니다.' },
      { status: 200 },
    );
  } catch (e) {
    return handleError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { book, content } = await req.json();
    const data = await createSentence(book, content);
    revalidateTag('sentence-list');
    return NextResponse.json(
      {
        success: true,
        data,
        message: '문장을 성공적으로 생성했습니다.',
      },
      { status: 200 },
    );
  } catch (e) {
    return handleError(e);
  }
}
