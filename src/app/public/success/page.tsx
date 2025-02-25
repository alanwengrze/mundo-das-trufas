"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Card,  CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "motion/react";
import { mutate } from "swr";
export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const {push} = useRouter();
  useEffect(() => {
    if (!sessionId) {
      push("/"); // Se não houver session_id, redireciona para home
      return;
    }

  async function finalizeOrder() {
    try {
      const response = await api.get(`/api/order-status?session_id=${sessionId}`);
      if (response.status !== 201) throw new Error("Erro ao finalizar pedido");
      mutate("/cart");
      mutate("/order");
      console.log("Pedido criado com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }

    finalizeOrder();
  }, [sessionId, push]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Icons.checkCircle className="h-16 w-16 text-green-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center space-y-2 mt-4"
          >
            <h1 className="text-2xl font-bold text-foreground">Pagamento efetuado com sucesso!</h1>
            <p className="text-muted-foreground">Obrigado por comprar conosco! Seu pedido já está sendo processado e logo será entregue.</p>
          </motion.div>
        </CardHeader>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => push("/")}>
            <Icons.home className="mr-2 h-4 w-4" />
            Voltar para home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
