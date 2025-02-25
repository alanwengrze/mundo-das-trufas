import { Icons } from "./icons";
import { Button } from "./ui/button";
interface BuyProps {
  quantity: number
  onMinus: () => void
  onPlus: () => void
}
export const Buy = ({quantity, onMinus, onPlus}: BuyProps) => {
  return (
    <div className="flex items-center px-2 py-1 gap-1 duration-200 bg-primary/20 rounded-sm">
      <Button 
        onClick={onMinus}
        variant="ghost"
        className="py-0 px-2 h-6"
      >
        <Icons.minus className="duration-200 p-0" size={16}/>
      </Button>
      <span>{quantity}</span>
      <Button 
        onClick={onPlus}
        variant="ghost"
        className="py-0 px-2 h-6"
      >
        <Icons.plus className="duration-200" size={16}/>
      </Button>
    </div>
  );
};