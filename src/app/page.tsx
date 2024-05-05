// "use client"를 파일 최상단에 추가
"use client";

import { NextComponentType, NextPageContext } from "next";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
interface RootProps {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

function Root({ Component, pageProps }: RootProps) {
  return (
    <SessionProvider session={pageProps?.session}>
      <ProtectedRoute Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

function ProtectedRoute({ Component, pageProps }: RootProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // "loading" 상태
    if (status === "loading") return;
    // 세션이 없고, 현재 경로가 로그인 페이지가 아니면 로그인 페이지
    if (!session && pathname !== "/login") {
      router.push("/login"); // 수정된 부분
    }
    // 세션이 있고, 현재 경로가 루트 경로이면 letter 페이지
    else if (session && pathname === "/") {
      router.push("/letter");
    }
  }, [session, status, pathname, router]);

  return <Component {...pageProps} />;
}

export default Root;
