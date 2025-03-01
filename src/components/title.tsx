import { Badge } from "./ui/badge"
export function Title({ title }: { title: string }) {
  return (
    <Badge className="text-2xl font-bold my-8 px-4 py-2 bg-primary/10 border border-primary w-fit rounded-sm text-foreground dark:bg-primary/5 dark:border-primary/30">{title}</Badge>
  )
}