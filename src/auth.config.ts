// import type {NextAuthConfig} from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// export const authConfig = {
//     pages: {
//         signIn: '/login'
//     },
//     callbacks: {
//        // async authorized({ auth, request: { nextUrl } }) {
//        //      const isLoggedIn = !!auth?.user;
//        //      const isLoginPage = nextUrl.pathname.startsWith('/login')
//        //
//        //     // 로그인이 되어있는 상태에서 로그인 페이지에 진입하면 메인 페이지로 리다이렉션해줍니다.
//        //     if(isLoggedIn &&isLoginPage ){
//        //         return Response.redirect(new URL('/main', nextUrl));
//        //     }
//        //     return isLoggedIn
//        // },
//        //  // 로그인 이후, 기본 페이지로 이동합니다.
//        //  async redirect({ url, baseUrl }) {
//        //      return baseUrl
//        //  }
//     },
//     providers: [ GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       })],
// } satisfies NextAuthConfig