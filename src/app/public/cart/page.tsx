import { AnimateTransactionWrapper } from "@/components/animate-transaction-wrapper";
import { CartSummary } from "./cart-summary";
export default function CartPage() {
  return (
    <AnimateTransactionWrapper>
      <CartSummary />
    </AnimateTransactionWrapper>
  );
}