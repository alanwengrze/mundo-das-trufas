"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/axios";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  useEffect(() => {
    if (!sessionId) {
      router.push("/"); // Se não houver session_id, redireciona para home
      return;
    }

  async function finalizeOrder() {
    try {
      const response = await api.post("/order", {
        sessionId,
      });

      if (response.status !== 201) throw new Error("Erro ao finalizar pedido");

      console.log("Pedido criado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }

    finalizeOrder();
  }, [sessionId, router]);

  return <h2>Obrigado pela compra! Processando pedido...</h2>;
}
