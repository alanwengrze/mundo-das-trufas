"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { ThemeToggle } from "./theme-toggle";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { SidebarTrigger } from "./ui/sidebar";
import { useCart } from "@/contexts/cart-context";
import { AuthButton } from "./auth-button";
import { Button } from "./ui/button";
import  Image from "next/image"
import Link from "next/link";


export const Header = () => {
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user?.role === "ADMIN";
  const { itemsCart } = useCart();
  const { push } = useRouter();
   const items = [
  {
    title: "Catálogo",
    url: "/public",
    icon: Icons.home,
    visible: isAuthenticated ? true : false
  },
  {
    title: "Pedidos",
    url: "/public/orders",
    icon: Icons.history,
    visible: isAuthenticated ? true : false
  },
  {
    title: "Carrinho",
    url: "/public/cart",
    icon: Icons.cart,
    visible: isAuthenticated && !isAdmin ? true : false
  },
  {
    title: "Gerenciar produtos",
    url: "/admin/products",
    icon: Icons.product,
    visible: isAuthenticated && isAdmin ? true : false
  }
  ]

  return (
    <>
      <div className="hidden md:sticky md:top-0 z-10 md:block w-full">
        <div className="glass flex items-center p-4 gap-4 border-b border-b-input">
        {isAuthenticated && (
          <SidebarTrigger variant="outline" className="md:sticky"/>
        )}
        {!isAuthenticated &&(
          <Link href="/">
            <Image 
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </Link>
        )}
        <AuthButton />
        <ThemeToggle />
        </div>
      </div>
     
      <Menubar className="sticky rounded-none border-none py-4 z-10 md:hidden">
        <MenubarMenu>
          <MenubarTrigger>{<Icons.menu />}</MenubarTrigger>
          <MenubarContent className="glass flex flex-col items-baseline gap-3">
            {items.map((item) => (
              item.visible &&
              <MenubarItem className="flex gap-2" key={item.title} onClick={() => push(item.url)}>
                  {item.title === "Carrinho" && itemsCart.length > 0 && (
                    <div className="relative -ml-2">
                      <span className="absolute -top-4
                      -right-9 h-4 w-4 rounded-full bg-primary/50 text-xs text-center text-slate-50">{itemsCart.length}</span>
                    </div>
                  )}
                {<item.icon className="h-4 w-4"/>}
                {item.title}
              </MenubarItem>
            ))}
            <MenubarItem asChild>
              <AuthButton />
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

    </>
  );
};