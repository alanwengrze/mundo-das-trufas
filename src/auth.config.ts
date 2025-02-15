import Google from "next-auth/providers/google";
import Mailgun from "next-auth/providers/mailgun"
import type { NextAuthConfig } from "next-auth"

 
export default { 
  providers: [
    Google ({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Mailgun({
      apiKey: process.env.MAILGUN_API_KEY
    })
  ],
  pages: {
    signIn: "/",
    signOut: "/auth",
    error: "/auth",
    verifyRequest: "/",
    newUser: "/",
  },
} satisfies NextAuthConfig