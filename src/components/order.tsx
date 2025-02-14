import { OrderType } from "@/schemas/order.schema";
interface OrderProps {
  order: OrderType
}
export function Order({ order }: OrderProps) {
  return (
    <div>
      <h1>{order.amount}</h1>
      <h1>{order.status}</h1>
      <div>
        {order.itemsOrder.map((item) => (
          <div key={item.productId}>
            <h1>{item.quantity}</h1>
            <h1>{item.productId}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}