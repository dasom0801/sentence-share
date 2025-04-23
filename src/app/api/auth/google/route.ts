import { authWithGoogle } from '@/db/controllers';
import { handleError } from '@/db/utils';
import { HttpError } from '@/utils';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpError(
        authHeader ? 'INVALID_AUTH_HEADER' : 'FIREBASE_ID_TOKEN_MISSING',
        400,
        authHeader
          ? 'Authorization header 형식이 유효하지 않습니다. "Bearer "로 시작해야합니다. '
          : 'Firebase ID Token이 전달되지 않아 로그인에 실패했습니다.',
      );
    }
    const idToken = authHeader.split(' ')[1];
    if (!idToken) {
      throw new HttpError(
        'FIREBASE_ID_TOKEN_MISSING',
        400,
        'Firebase ID Token이 전달되지 않아 로그인에 실패했습니다.',
      );
    }

    const { user, token } = await authWithGoogle(idToken);

    const cookieStore = cookies();
    cookieStore.set('access_token', token, {
      httpOnly: true,
      maxAge: 900000,
      secure: process.env.NODE_ENV === 'production',
    });

    return NextResponse.json(
      {
        success: true,
        data: user,
        message: '성공적으로 로그인했습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}
