import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator 
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { Icons } from "./icons";

export function MoreAction({children}:{children: React.ReactNode}) {
  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Icons.more className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
        
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
          <section className="w-fit flex flex-col gap-2">
            {children}
          </section>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}