
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/contexts/cart-context";
import { auth } from "@/auth";

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
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
        <CartProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <div className="h-screen max-w-7xl mx-auto mt-8 p-4 border border-white/5 rounded-md">{children}</div>
            <Toaster 
              richColors
            />
          </ThemeProvider>
        </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
