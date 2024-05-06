// project\src\app\layout.tsx 파일
import Navbar from "./Navbar";
import "../../styles/reset.css";
import RecoilRootWrapper from "./RecoilWrapper";
import { SessionProvider, useSession } from "next-auth/react";
import { Session } from "next-auth";
import LoginPage from "@/app/login/page";
import HomePage from "@/app/letter/page"; 

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children} : LayoutProps) {
  // const { data: sessionData, status } = useSession();
  // const loading = status === "loading";

  // if (loading) {
  //   return <div>Loading...</div>; // 세션 정보를 불러오는 동안 로딩 상태 표시
  // }

  // // 세션이 있으면 HomePage를 렌더링, 없으면 LoginPage를 렌더링
  // const content = sessionData ? <HomePage /> : <LoginPage />;

  return (
    <html lang="en">
      <body>
        <Navbar />
        <RecoilRootWrapper>
          <SessionProvider>
            {children}
          </SessionProvider>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
