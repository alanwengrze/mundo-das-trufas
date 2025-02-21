"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const OrderDetailsButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/public/orders/${id}`);
  };

  return <Button onClick={handleClick} className="underline">Detalhes</Button>;
};
