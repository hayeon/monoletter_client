import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

type User = {
    id: string;
    email: string;
    name: string;
    emailVerified: Date | null;
};

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    Credentials({
      async authorize(credentials: Partial<Record<string, unknown>>) {
        if (credentials.id && credentials.password) {
          // 백엔드에서 로그인 처리
          let loginRes = {
            success: true,
            data: {
              user: {
                ID: "user1",
                NAME: "홍길동",
                EMAIL: "email@email.email",
              },
            }
          };
          // 로그인 실패 처리
          if (!loginRes.success) {
            console.log("로그인 실패")
            return null};
          // 로그인 성공 처리
          const user: User = {
            id: loginRes.data.user.ID ?? '',
            name: loginRes.data.user.NAME ?? '',
            email: loginRes.data.user.EMAIL ?? '',
            emailVerified: null,
          };
          console.log(user);
          
          return user;
        }
        return null;
      },
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user = token.user as User;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      
      if (trigger === "update" && session) {
        token = {...token, user : session}
        return token;
      };
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
