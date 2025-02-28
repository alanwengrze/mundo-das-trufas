"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarSeparator
} from "@/components/ui/sidebar"
import { Icons } from "./icons";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useCart } from "@/contexts/cart-context";
export function AppSidebar() {
  const { push } = useRouter();
  const pathname = usePathname();
  const {data: session, status} = useSession();
  const { itemsCart } = useCart();
  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user?.role === "ADMIN";
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
    
  },
  ]
  if(!isAuthenticated) return null
  return (
    <Sidebar collapsible="icon" className="z-50 h-full">
      <SidebarHeader />
      <SidebarContent className="w-[--radix-popper-anchor-width]">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                item.visible &&
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => push(item.url)}
                    className={`hover:muted-foreground hover:border hover:border-primary ${item.url === pathname ? "bg-primary/20 border border-primary" : ""}`}
                  >
                    {item.title === "Carrinho" && itemsCart.length > 0 && (
                      <div className="relative -ml-2">
                        <span className="absolute -top-4
                        -right-9 h-4 w-4 rounded-full bg-primary/50 text-xs text-center text-foreground">{itemsCart.length}</span>
                      </div>
                    )}
                    <item.icon className="relative mr-2 h-4 w-4" />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarSeparator className="mx-0"/>
      <SidebarFooter>
        <div className="flex items-center gap-2">
          <Image src={session?.user.image || "/placeholder.svg?height=32&width=32"} alt="avatar" className="h-8 w-8 rounded-full" width={32} height={32} />
          <div className="flex flex-col gap-1">
            {session?.user.name && <p className="text-sm font-medium leading-none text-muted-foreground">{session.user.name}</p>}
            {session?.user.email && <p className="text-xs leading-none text-accent-foreground">{session.user.email}</p>}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
