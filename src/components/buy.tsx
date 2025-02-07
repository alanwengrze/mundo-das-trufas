import { Button } from "./ui/button";
import { Icons } from "./icons";
interface BuyProps {
  quantity: number
  onMinus: () => void
  onPlus: () => void
}
export const Buy = ({quantity, onMinus, onPlus}: BuyProps) => {
  return (
    <div className="glass shadow border border-primary/20 flex items-center rounded-sm hover:bg-primary/50 px-2 py-1 gap-1 duration-200">
      <button onClick={onMinus}>
        <Icons.minus className=" hover:text-secondary duration-200" size={16}/>
      </button>
      <span>{quantity}</span>
      <button onClick={onPlus}>
        <Icons.plus className=" hover:text-secondary duration-200" size={16}/>
      </button>
    </div>
  );
};