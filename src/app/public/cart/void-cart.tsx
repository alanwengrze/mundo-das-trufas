import Link from "next/link"
import { Icons } from "@/components/icons"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function VoidCart() {
  return (
    <div className="container flex items-center justify-center min-h-[600px] px-4 md:px-6">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-8 p-10">
          <div className="rounded-full bg-primary/10 p-8 w-fit">
            <Icons.cart className="w-12 h-12 text-primary" />
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Parece que seu carrinho está vazio. :(</h1>
            <p className="text-muted-foreground">
              Por que você não confere os nossos produtos e vê se encontra algo que goste? <br />
              Vou te ajudar!
            </p>
          </div>
          <Button asChild className="w-full" size="lg">
            <Link href="/public">Buscar produtos</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
