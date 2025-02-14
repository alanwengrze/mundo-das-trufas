import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config"
import { Role } from "@prisma/client";

export const {auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({user, token}){

      if (user) {
        token.sub = user.id; // Adiciona o ID do usuário ao token JWT

        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (dbUser) {
          // token.id = dbUser.id;
          token.role = dbUser.role; // 🔹 Armazena a role no token JWT
        }
        console.log(dbUser)
    
        // Verifica se o carrinho do usuário existe
        const existingCart = await prisma.cart.findUnique({
          where: {
            userId: user.id,
          },
        });
    
        // Cria um carrinho para o usuário se ele ainda não tiver um
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

      // Atualiza o ID do usuário na sessão
      if(session.user && token.sub){
        session.user.id = token.sub
        session.user.role = token.role as Role
      }
      return session
    }
  },
  // Configurações do NextAuth
  secret: process.env.AUTH_SECRET,
  ...authConfig,
})
