import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    // session.user가 존재하는지 확인
    if (session.user) {
      return (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>로그아웃</button>
        </>
      );
    } else {
      // session.user가 undefined인 경우 처리 로직
      return <>User data unavailable</>;
    }
  }
  return (
    <>
    <SessionProvider>
      Not signed in <br />
      <button onClick={() => signIn()}>로그인</button>
      </SessionProvider>
    </>
  );
}
