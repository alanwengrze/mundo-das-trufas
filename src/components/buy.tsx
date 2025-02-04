import { Button } from "./ui/button";
import { Icons } from "./icons";
export const Buy = () => {
  return (
    <div className="glass shadow flex items-center gap-2 rounded-sm p-2">
      <button>
        <Icons.minus className="h-6 w-6 text-primary" />
      </button>
      <span>1</span>
      <button>
        <Icons.plus className="h-6 w-6 text-primary" />
      </button>
    </div>
  );
};