
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(req: NextRequest) {
  const cookieStore = cookies()
  const logincheck = cookieStore.get('usercheck')

  // 로그인하지 않은 사용자를 로그인 페이지로 리다이렉트
  if (!logincheck && !req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
