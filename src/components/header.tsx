"use client";

import { ThemeToggle } from "./theme-toggle"
import { CartHeader } from "./cart-header"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { ButtonNavigation } from "./button-navigation";
import { Icons } from "./icons";
export const Header = () => {
  const {push} = useRouter()
  const {status} = useSession()
  return (
    <div className="glass z-50 sticky top-0 w-full h-20 flex items-center justify-between flex-row-reverse border-b px-6">
      <div className="flex items-center gap-4">
        <ButtonNavigation 
          onNavigation={() => push("/")}
          text="Home"
          icon={<Icons.home />}
        />
         <ButtonNavigation 
          onNavigation={() => push("/public/orders")}
          text="Pedidos"
          icon={<Icons.history />}
        />
        <CartHeader />
        {
          status !== "authenticated" ? (
             <ButtonNavigation
              onNavigation={() => push("/public/auth")}
              text="Entrar"
              icon={<Icons.login/>}
              />
          ) : (
            <ButtonNavigation
            onNavigation={() => signOut({ callbackUrl: "/public/auth" })}
            text="Sair"
            icon={<Icons.logout />}
          />    
          )
        }
      </div>
      <ThemeToggle />
    </div>
  )
}