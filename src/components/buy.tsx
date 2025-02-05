import { Button } from "./ui/button";
import { Icons } from "./icons";
export const Buy = () => {
  return (
    <div className="glass shadow flex items-center rounded-sm hover:bg-primary/50 px-2 py-1 gap-1 duration-200">
      <button>
        <Icons.minus className="text-primary hover:text-foreground duration-200" size={16}/>
      </button>
      <span>1</span>
      <button >
        <Icons.plus className="text-primary hover:text-foreground duration-200" size={16}/>
      </button>
    </div>
  );
};