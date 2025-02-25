import { signOut, useSession } from "next-auth/react";
import { ButtonDestructive } from "./button-destructive";
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
        <ButtonDestructive 
          textTrigger="Sair"
          variantTrigger="outline"
          icon={<Icons.logout/>}
          textAction="Sair"
          textCancel="Cancelar"
          title="Sair"
          description="Tem certeza que deseja sair?"
          onAction={() => signOut({ redirectTo: "/public/auth" })}
        />
       
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