import { Column } from "@tanstack/react-table"
import { Filter } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FilterOption {
  label: string;
  value: string;
}

interface DataTableFilterByIndexProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  filterOptions:FilterOption[]
}

export function DataTableFilterByIndex<TData, TValue>({
  column,
  title,
  className,
  filterOptions
}: DataTableFilterByIndexProps<TData, TValue>) {
  if (!column.getCanFilter()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center", className)}>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="-ml-3 h-8">
              <Filter className="h-2 w-2" />
              <span>{title}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
          {filterOptions.map(({ label, value }) => (
          <DropdownMenuItem key={value} onClick={() => column.setFilterValue(value)}>
            {label}
          </DropdownMenuItem>
        ))}
          </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
