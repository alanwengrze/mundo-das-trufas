"use client"
import {NewAddress} from "./new-address"

import { type FullAddressType } from "@/schemas/address.schema"
import { api } from "@/lib/axios"
import useSWR from "swr"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { AddressList } from "./address-list"
export default function CheckoutPage() {

  const [addressType, setAddressType] = useState("registered")
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

   //Se optar por endereços existentes, busca os endereços cadastrados
   const {data: address, isLoading} = useSWR<FullAddressType[]>("/address", async (url: string) => {
    const response = await api.get(url);
    return response.data;
  })
  
  return(
    <Card className="max-w-2xl mx-auto px-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Endereço de entrega</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup defaultValue="registered" onValueChange={(value) => setAddressType(value)} className="space-y-3 mb-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="registered" id="registered" />
              <Label htmlFor="registered">Usar um endereço cadastrado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new">Adicionar um novo endereço</Label>
            </div>
        </RadioGroup>

          {isLoading ? <p>Carregando...</p> : addressType === "registered" && (
          <div className="space-y-4">
            {address?.map((address) => (
              <AddressList 
                address={address}
                key={address.id}
                onSelectAddress={() => setSelectedAddress(address.id)}
                selectedAddress={selectedAddress}
              />
            ))}
          </div>
        )}
        {addressType === "new" && (
          <NewAddress />
        )}
      </CardContent>
    </Card>
  )
}