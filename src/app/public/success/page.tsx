"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Card, CardHeader } from "@/components/ui/card";
import { motion } from "motion/react";
import swr from "swr";
import type { FullOrderType } from "@/schemas/order.schema";
// import { OrderInfo } from "../orders/[id]/order-info";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const {push} = useRouter();

  const { data: order, isValidating } = swr<FullOrderType>(sessionId ? `/order?session_id=${sessionId}`: null, async (url: string) => {
    const response = await api.get(url);
    
    return response.data;
  });

  if(isValidating) return null;

  if (!order) return null;
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
            className="text-center space-y-2 my-4"
          >
            <h1 className="text-2xl font-bold text-foreground">{order.status === "COMPLETED" ? "Pagamento pendente!" : "Pagamento efetuado com sucesso!"}</h1>
            <p className="text-muted-foreground">Obrigado por comprar conosco! Seu pedido já está sendo processado e logo será entregue.</p>
            {/* <OrderInfo
              createdAt={order.createdAt}
            /> */}
          </motion.div>

        </CardHeader>
        <motion.div className="w-full flex flex-col gap-2 mx-auto px-6 mb-2 md:flex-row md:items-center ">
          <Button variant="outline" className="w-full" onClick={() => push("/")}>
            <Icons.home className="mr-2 h-4 w-4" />
            Voltar para home
          </Button>
          {/* <Button 
            variant="outline" className="w-full" 
            onClick={() => push(`/public/orders/${order.id}`)}
            disabled={!order || isValidating}
          >
            <Icons.history className="mr-2 h-4 w-4" />
            Ver meu pedido
          </Button> */}
        </motion.div>
      </Card>
    </div>
  );
}
