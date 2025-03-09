import { deleteSentence, getSentence, updateSentence } from '@/db/controllers';
import { handleError } from '@/db/utils';
import { HttpError } from '@/lib/utils';
import type { ApiResponse, Sentence } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

type SentenceIdParams = { params: { id: string } };

export async function GET(
  req: NextRequest,
  { params }: SentenceIdParams,
): Promise<NextResponse<ApiResponse<null | Sentence>>> {
  const { id } = params;
  try {
    const data = await getSentence(id);

    if (!data) {
      throw new HttpError(
        'NOT_FOUND_SENTENCE',
        404,
        '문장을 찾을 수 없습니다. ',
      );
    }
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
    return NextResponse.json({
      success: true,
      data,
      message: '문장을 성공적으로 삭제했습니다.',
    });
  } catch (error) {
    return handleError(error);
  }
}
