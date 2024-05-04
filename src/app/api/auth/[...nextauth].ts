import GoogleProvider from 'next-auth/providers/google';


export const authOptions = {
  providers: [
  	//구글 provider 
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};