import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Role } from "@prisma/client";
import authConfig from "./auth.config"

export const {auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({user, token}){
      if (user) {
        token.sub = user.id; // Adiciona o ID do usuário ao token JWT
    
        const existingCart = await prisma.cart.findUnique({
          where: {
            userId: user.id,
          },
        });
    
        if (!existingCart) {
          try {
            await prisma.cart.create({
              data: {
                userId: user.id,
              },
            });
          } catch (error) {
            console.error("Erro ao criar carrinho:", error);
          }
        } else {
          console.log("Carrinho já existe para o usuário:", user.id);
        }
      }

      return token;
    },

    async session({session, token}){
      if(session.user && token.sub){
        session.user.id = token.sub
      }
      return session
    }
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
})
