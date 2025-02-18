"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { ThemeToggle } from "./theme-toggle";
import { CartHeader } from "./cart-header";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ButtonNavigation } from "./button-navigation";
import { Icons } from "./icons";

const NavigationButtons = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <>
      <ButtonNavigation onNavigation={() => redirect("/")} text="Home" icon={<Icons.home />} />
      {isAuthenticated && (
        <>
          <ButtonNavigation onNavigation={() => redirect("/public/orders")} text="Pedidos" icon={<Icons.history />} />
          <CartHeader text="Produtos" icon={<Icons.cart />} />
        </>
      )}
      
      {isAuthenticated ? (
        <ButtonNavigation onNavigation={() => signOut({ redirectTo: "/public/auth" })} text="Sair" icon={<Icons.logout />} />
      ) : (
        <ButtonNavigation onNavigation={() => redirect("/public/auth")} text="Entrar" icon={<Icons.login />} />
      )}
    </>
  );
};

export const Header = () => {
  const { status } = useSession()
  const isAuthenticated = status === "authenticated";

  return (
    <>
      {isAuthenticated ? (
        <div className="sticky top-0 z-50 hidden md:block">
          <div className="glass flex items-center p-4 gap-4">
            <NavigationButtons isAuthenticated={isAuthenticated} />
            <ThemeToggle />
          </div>
        </div>
      ) : (
        <div className="glass sticky top-0 z-50 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <NavigationButtons isAuthenticated={isAuthenticated} />
          </div>
          <ThemeToggle />
        </div>
      )}

      {!isAuthenticated ? null : (
        <Menubar className="p-2 z-10 md:hidden">
          <MenubarMenu>
            <MenubarTrigger className="p-2 border border-primary">Menu</MenubarTrigger>
            <MenubarContent className="glass flex flex-col items-baseline gap-3">
              <MenubarItem asChild>
                <ThemeToggle />
              </MenubarItem>
              <MenubarItem asChild>
                <NavigationButtons isAuthenticated={isAuthenticated} />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}
    </>
  );
};