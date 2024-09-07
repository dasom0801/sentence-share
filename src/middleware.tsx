import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const config = {
  matcher: ['/my/:path*', '/edit/:path*'],
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
