import { useState } from "react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
export function ButtonCheckout() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    redirect("/public/checkout");
  }
  return(
    <Button 
      className=""
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "Processando..." : "Finalizar Compra"}
    </Button>
  )
}