import { Icons } from "./icons";
import { Button } from "./ui/button";
interface CartProductProps {
  addToCart: () => void
}
export const CartProduct = ({addToCart}:CartProductProps) => {
  return(
    <Button onClick={addToCart}>
      <Icons.cart className="h-4 w-4" />
    </Button>
  )
}