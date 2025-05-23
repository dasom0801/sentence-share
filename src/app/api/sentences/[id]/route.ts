import { deleteSentence, getSentence, updateSentence } from '@/db/controllers';
import { handleError } from '@/db/utils';
import type { ApiResponse, Sentence } from '@/types';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type SentenceIdParams = { params: { id: string } };

export async function GET(
  req: NextRequest,
  { params }: SentenceIdParams,
): Promise<NextResponse<ApiResponse<null | Sentence>>> {
  const { id } = params;
  try {
    const data = await getSentence(id);
    return NextResponse.json(
      {
        success: true,
        data,
        message: '문장을 성공적으로 가져왔습니다.',
      },
      { status: 200 },
    );
  } catch (e) {
    return handleError(e);
  }
}

export async function PUT(req: NextRequest, { params }: SentenceIdParams) {
  try {
    const { id: sentenceId } = params;
    const { book, content } = await req.json();
    const data = await updateSentence({ sentenceId, book, content });
    revalidateTag(`sentence-${sentenceId}`);
    revalidateTag('sentence-list');

    return NextResponse.json({
      success: true,
      data,
      message: '문장을 성공적으로 업데이트했습니다.',
    });
  } catch (e) {
    return handleError(e);
  }
}

export async function DELETE(req: NextRequest, { params }: SentenceIdParams) {
  try {
    const { id: sentenceId } = params;
    const data = await deleteSentence(sentenceId);

    revalidateTag(`sentence-${sentenceId}`);
    revalidateTag('sentence-list');

    return NextResponse.json({
      success: true,
      data,
      message: '문장을 성공적으로 삭제했습니다.',
    });
  } catch (error) {
    return handleError(error);
  }
}
