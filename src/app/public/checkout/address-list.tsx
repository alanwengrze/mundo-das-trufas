"use client"

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import type { FullAddressType } from "@/schemas/address.schema";
import { useRouter } from "next/navigation";
interface AddressListProps {
  selectedAddress: string | null
  address: FullAddressType
  onSelectAddress: (id : string) => void
}
export function AddressList({address, selectedAddress, onSelectAddress}: AddressListProps) {
  const { push } = useRouter();
  async function handleOnSubmit(data: FullAddressType) {
    console.log("data", data)
    try {
      const res = await api.post("/payment");
      if (res.status !== 200) throw new Error("Erro ao iniciar checkout");

      const { url } = await res.data;
      push(url); // Redireciona para o Stripe
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
    }
  }
  return(
    <div
    key={address.id}
    className={`relative rounded-lg border p-4 cursor-pointer transition-colors ${
      selectedAddress === address.id
        ? "border-primary bg-primary/5"
        : "border-muted hover:border-primary/50"
    }`}
    onClick={() => onSelectAddress(address.id)}
  >
    {selectedAddress === address.id && (
      <div className="absolute right-4 top-4">
        <Icons.check className="h-5 w-5 text-primary" />
      </div>
    )}
    <div className="space-y-1">
      <p className="font-medium">
        {address.street} {address.number}
      </p>
      <p className="text-sm text-muted-foreground">
        {address.city}, {address.state} {address.zipCode}
      </p>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <Button 
        onClick={() => handleOnSubmit(address)}
        disabled={selectedAddress !== address.id}
      >Finalizar compra</Button>
    </div>
  </div>
  )
}