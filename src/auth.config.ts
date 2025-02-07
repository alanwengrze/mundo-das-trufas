import EmailProvider from "next-auth/providers/email";
import Resend from "next-auth/providers/resend";
import type { NextAuthConfig } from "next-auth"

 
export default { 
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASS
        }
      },
    })
  ],
  pages: {
    signIn: "/",
    signOut: "/auth",
    error: "/auth",
    verifyRequest: "/",
    newUser: "/"
  },
} satisfies NextAuthConfig