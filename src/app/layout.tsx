import Navbar from "./Navbar";
import "../../styles/reset.css"
import RecoilRootWrapper from "./RecoilWrapper";
import { SessionProvider } from "next-auth/react"


export default function Layout({
  children, // will be a page or nested layout
  // pageProps: { session }
}: {
  children: React.ReactNode;
  pageProps:React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <RecoilRootWrapper> 
           {/* <SessionProvider session={session}> */}

          {children}
        {/* </SessionProvider> */}
        </RecoilRootWrapper>
      </body>
    </html>
  );
}