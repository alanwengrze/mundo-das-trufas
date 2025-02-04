"use client";
import { Icons } from "./icons";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
export function SignOut() {
  return (
    <Button
      className=""
      onClick={() => signOut({ callbackUrl: "/public/auth" })}
    >
      <Icons.logout className="mr-2 h-4 w-4" />
      Sair
    </Button>
  );
}