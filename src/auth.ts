// import NextAuth from "next-auth"
// import GoogleProvider from 'next-auth/providers/google';
// import { authConfig } from './auth.config';
// import Credentials from 'next-auth/providers/credentials';
// export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
//     ...authConfig,
//     providers: [
//       GoogleProvider({
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         authorization: {
//             params: {
//               prompt: "consent",
//               access_type: "offline",
//               response_type: "code"
//             }
//           }
//       }),
//     ],
    
//   callbacks: {
//     session({session}) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//         },
//       }
//     },
//   },
// })
