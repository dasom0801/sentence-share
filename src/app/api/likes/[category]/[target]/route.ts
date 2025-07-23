import { deleteLike } from '@/db/controllers';
import { handleError } from '@/db/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { target: string; category: 'sentence' | 'book' } },
) {
  try {
    const { category, target } = params;
    await deleteLike({ category, target });
    return NextResponse.json(
      {
        success: true,
        data: {
          isLiked: false,
          target,
          category,
        },
        message: '좋아요를 취소했습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}
