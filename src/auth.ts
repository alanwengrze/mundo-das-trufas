import NextAuth, { type NextAuthConfig } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import Resend from "next-auth/providers/resend";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Role } from "@prisma/client";

export const {auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
    verifyRequest: "/",
    newUser: "/"
  },
  callbacks: {
    async jwt({token, user}){
      if(user){
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email as string
          },
          select: {
            role: true
          }
        })
        if(dbUser){
          token.role = dbUser.role
        }
      }
      return token
    },
    async session({session, token}){
      if(token){
        session.user.role = token.role as Role
        
      }
      return session
    }
  },
  secret: process.env.AUTH_SECRET
})
