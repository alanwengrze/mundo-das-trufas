import { useState } from "react";
import { Button } from "./ui/button";
import { api } from "@/lib/axios";

export function ButtonCheckout() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);

    try {
      const res = await api.post("/payment");

      if (res.status !== 200) throw new Error("Erro ao iniciar checkout");

      const { url } = await res.data;
      window.location.href = url; // Redireciona para o Stripe
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
    } finally {
      setLoading(false);
    }
  }
  return(
    <Button 
      className="w-full text-white"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "Processando..." : "Finalizar Compra"}
    </Button>
  )
}