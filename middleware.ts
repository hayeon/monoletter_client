// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  if (!token) {
    // 로그인하지 않은 유저는 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 로그인한 유저는 요청을 계속 진행
  return NextResponse.next();
}

// 보호된 경로 설정
export const config = {
  matcher: ['/protected/:path*'],
};