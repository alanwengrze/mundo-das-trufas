import { Icons } from "./icons";
import { ItemCart } from "./item-cart";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "./ui/sheet";

export const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild> 
        <Button className="">
          <Icons.cart className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-4">
        <SheetHeader className="mb-6">
          <SheetTitle>Meu carrinho</SheetTitle>
        </SheetHeader>
          <ItemCart />
          <ItemCart />
        </div>
        <div className="flex flex-col gap-4">
          <SheetDescription className="flex justify-between text-primary">
            <p className="text-xl font-semibold">Total:</p>
            <span className="text-xl font-semibold"><span className="text-sm mr-1 font-thin">R$</span>14</span>
          </SheetDescription>
          <Button className="w-full">Finalizar compra</Button>
        </div>
      </SheetContent>
      
    </Sheet>
  );
};