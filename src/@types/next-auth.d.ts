import NextAuth from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name?: string;
      image?: string;
      role: Role; 
    };
  }

  interface JWT {
    role?: Role; 
  }
}