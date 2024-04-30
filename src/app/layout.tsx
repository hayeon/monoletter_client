import Navbar from "./Navbar";
import "../../styles/reset.css"
import RecoilRootWrapper from "./RecoilWrapper";
import AuthWrapper from "../auth.wrapper";


export default function Layout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <RecoilRootWrapper> <AuthWrapper> 
          {children}
        </AuthWrapper></RecoilRootWrapper>
      </body>
    </html>
  );
}