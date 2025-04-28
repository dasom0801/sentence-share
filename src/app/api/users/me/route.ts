import { editUserInfo, getUserInfo } from '@/db/controllers';
import { handleError } from '@/db/utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// 로그인한 사용자의 정보 가져오기
export async function GET(req: NextRequest) {
  const token = cookies().get('access_token')?.value;
  try {
    const data = token ? await getUserInfo(token) : null;
    return NextResponse.json(
      {
        success: true,
        data,
        message: '사용자 정보를 성공적으로 가져왔습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}

// 로그인한 사용자의 정보 수정하기
export async function PUT(req: NextRequest) {
  try {
    const { name, profileUrl } = await req.json();
    const user = await editUserInfo({ name, profileUrl });
    revalidatePath('/my/setting');
    return NextResponse.json(
      {
        success: true,
        data: user,
        message: '사용자 정보를 성공적으로 변경했습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleError(error);
  }
}
