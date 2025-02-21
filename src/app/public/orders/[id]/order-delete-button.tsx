"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { useSWRConfig } from "swr";
export const OrderDeleteButton = ({ id }: { id: string }) => {
  const { mutate } = useSWRConfig();
  const handleClick = async () => {
    console.log("id", id)
    await api.delete(`/order/${id}`);
    mutate(`/order`);
  };

  return (
    <Button 
    onClick={handleClick} 
    variant="destructive"
    >
      Excluir
    </Button>
  )
};
