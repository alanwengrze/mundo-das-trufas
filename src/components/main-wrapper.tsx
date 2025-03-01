"use client"

import { cn } from "@/lib/utils";
export function MainWrapper({ children }: { children: React.ReactNode }) {
  
  return (
    <main
      className={cn(
        "w-full flex-1 overflow-hidden bg-background",
       
      )}
    >
      {children}
    </main>
  );
}