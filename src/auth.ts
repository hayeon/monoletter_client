import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import {z} from "zod";
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
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    Credentials({
      async authorize(credentials: Partial<Record<string, unknown>>) {
        // 사용자 인증 로직
        // 일단은 ID와 PASSWORD 존재 여부로 검증
        if (credentials.id && credentials.password) {
          // 백엔드에서 로그인 처리 후 사용자 정보 가져오기
          let loginRes = {
            success: true,
            data: {
              user: {
                ID: "user1",
                NAME: "홍길동",
                EMAIL: "email@email.email",
              },
            },
          };

          if (!loginRes.success) {
            return null;
          }

          const user: User = {
            id: loginRes.data.user.ID ?? "",
            name: loginRes.data.user.NAME ?? "",
            email: loginRes.data.user.EMAIL ?? "",
            emailVerified: null,
          };

          // 데이터베이스에 사용자 정보 저장
          // await saveUserToDatabase(user);

          console.log(user);

          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    // 세션 유지 기간을 일주일로 설정
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});
