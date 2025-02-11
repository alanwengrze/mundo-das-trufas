import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
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
      }
      return session
    }
  },
  // Configurações do NextAuth
  secret: process.env.AUTH_SECRET,
  ...authConfig,
})
