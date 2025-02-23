import { signOut, useSession } from "next-auth/react";
import { ButtonNavigation } from "./button-navigation";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
export function AuthButton() {
  const { push } = useRouter();
  const { status } = useSession()
  const isAuthenticated = status === "authenticated";
  return(
    <>
      {isAuthenticated ? (
        <Button 
          onClick={() => signOut({ redirectTo: "/public/auth" })}
          variant="destructive" 
        >
          <Icons.logout/>
          Sair
        </Button>
      ) : (
        <Button 
          onClick={() => push("/public/auth")}
          variant="outline" 
      >
        <Icons.login/>
        Entrar
      </Button>
      )}
    </>
  )
}