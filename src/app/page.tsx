import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function App() {
  const session = await auth();
  return (
    <div>
      {session?.user.role !== "ADMIN" ? redirect("/public") : redirect("/admin")}
    </div>
  );
}
