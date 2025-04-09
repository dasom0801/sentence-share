import { authWithGoogle } from '@/db/controllers';
import { handleError } from '@/db/utils';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const idToken = req.headers.get('authorization')?.split(' ')[1];
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
