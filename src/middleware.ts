import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/my/:path*', '/edit/:path*'], // 로그인이 필요한 경로
};

export function middleware(request: NextRequest) {
  const cookie = cookies();
  const token = cookie.get('access_token');
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?afterLogin=${request.nextUrl.pathname}`, request.url),
    );
  }
  return NextResponse.next();
}
