import { Badge } from "./ui/badge"
export function Title({ title }: { title: string }) {
  return (
    <Badge className="text-2xl font-bold my-8 px-4 py-2 bg-primary/20 w-fit rounded-md border border-primary text-foreground">{title}</Badge>
  )
}