import { NextRequest, NextResponse } from 'next/server';

const redirectToLogin = (request: NextRequest) => {
  const loginUrl = new URL('/login', request.url);
  const currentPath = request.nextUrl.pathname + request.nextUrl.search;
  loginUrl.searchParams.set('afterLogin', currentPath);

  return NextResponse.redirect(loginUrl);
};

export const config = {
  matcher: ['/my/:path*', '/edit/:path*'], // 로그인이 필요한 경로
};

export function middleware(request: NextRequest) {
  // 정적 파일은 통과
  if (request.nextUrl.pathname.includes('.')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('access_token');
  if (!token) {
    return redirectToLogin(request);
  }
  return NextResponse.next();
}
