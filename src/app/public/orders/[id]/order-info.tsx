import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormatter } from "@/utils/dateFormatter";
interface OrderInfoProps {
  createdAt: Date;
  paymentType?: string;
}
export function OrderInfo({createdAt, paymentType}:OrderInfoProps) {
  return(
    <Card>
    <CardHeader>
      <CardTitle>Informações do pedido</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Data do pedido</span>
        <span>{dateFormatter.format(createdAt)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Método de pagamento</span>
        {
          paymentType === "card" ? (
            <span className="text-muted-foreground">Cartão</span>
          ) : (
            <span className="text-muted-foreground">Pendente</span>
          )
        }
      </div>
    </CardContent>
  </Card>
  )
}