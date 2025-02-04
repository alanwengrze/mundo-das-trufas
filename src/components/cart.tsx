import { Icons } from "./icons";
import { Button } from "./ui/button";

export const Cart = () => {
  return (
    <div>
      <Button className="">
        <Icons.cart className="h-4 w-4" />
      </Button>
    </div>
  );
};