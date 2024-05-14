// project\src\app\layout.tsx 파일
import Navbar from "./Navbar";
import "../../styles/reset.css";
import RecoilRootWrapper from "./RecoilWrapper";
import LoginPage from "@/app/login/page";
import HomePage from "@/app/letter/page";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <RecoilRootWrapper>{children}</RecoilRootWrapper>
      </body>
    </html>
  );
}
