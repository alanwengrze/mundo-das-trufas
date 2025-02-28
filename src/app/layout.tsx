
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/contexts/cart-context";
import { auth } from "@/auth";
import { ProductProvider } from "@/contexts/product-context";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";
import { Separator } from "@/components/ui/separator";
import { MainWrapper } from "@/components/main-wrapper";
export const metadata: Metadata = {
  title: "Mundo das trufas",
  description: "Loja virtual de trufas e sobremesas.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <html lang="pt-BR">
      <body>
        <SessionProvider session={session}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <ProductProvider>
              <CartProvider>
                <ThemeProvider
                  attribute="class"
                  enableSystem
                  disableTransitionOnChange
                >
                  <AppSidebar/>
                  <MainWrapper 
                    
                  >
                    <Header />
                    <section className=" px-4 h-full ">
                      {children}
                    </section>
                    <Separator />
                    <footer className=" text-center text-muted-foreground text-sm py-3">
                      Mundo das trufas
                    </footer>
                  </MainWrapper>
                  <Toaster 
                    richColors
                  />
                </ThemeProvider>
              </CartProvider>
            </ProductProvider>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
