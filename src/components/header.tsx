"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { ThemeToggle } from "./theme-toggle";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ButtonNavigation } from "./button-navigation";
import { Icons } from "./icons";
import { SidebarTrigger } from "./ui/sidebar";


const NavigationButtons = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <>
      <ButtonNavigation onNavigation={() => redirect("/")} text="Home" icon={<Icons.home />} />
      {isAuthenticated && (
        <>
          <ButtonNavigation onNavigation={() => redirect("/public/orders")} text="Pedidos" icon={<Icons.history />} />
        </>
      )}
      
      {isAuthenticated ? (
        <ButtonNavigation onNavigation={() => signOut({ redirectTo: "/public/auth" })} text="Sair" icon={<Icons.logout />} variant="destructive"/>
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
      <div className="hidden md:block">
        <div className="glass flex items-center p-4 gap-4">
        <SidebarTrigger variant="outline"/>
        <ThemeToggle />
        {isAuthenticated ? (
        <ButtonNavigation onNavigation={() => signOut({ redirectTo: "/public/auth" })} text="Sair" variant="destructive" icon={<Icons.logout />} />
      ) : (
        <ButtonNavigation onNavigation={() => redirect("/public/auth")} text="Entrar" icon={<Icons.login />} />
      )}
        </div>
      </div>
     
      {!isAuthenticated ? null : (
        <Menubar className="py-10 px-2 z-10 md:hidden">
          <MenubarMenu>
            <MenubarTrigger>{<Icons.menu />}</MenubarTrigger>
            <MenubarContent className="glass flex flex-col items-baseline gap-3">
              <MenubarItem asChild>
                <ThemeToggle />
              </MenubarItem>
              <MenubarItem asChild>
                <NavigationButtons isAuthenticated={isAuthenticated} />
              </MenubarItem>
              <MenubarItem onClick={() => redirect("/public/cart")}>
                Carrinho
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      )}
    </>
  );
};