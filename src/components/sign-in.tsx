"use client";
import { Icons } from "./icons";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
export function SignIn() {
  return (
    <Button
      className=""
      onClick={() => redirect("/public/auth")}
    >
      <Icons.login className="mr-2 h-4 w-4 " />
      Entrar
    </Button>
  );
}