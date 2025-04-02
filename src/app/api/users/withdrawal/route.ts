import { deleteUser } from '@/db/controllers';
import { handleError } from '@/db/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  try {
    await deleteUser();
    return NextResponse.json(
      {
        success: true,
        data: null,
        message: '회원 탈퇴했습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}
