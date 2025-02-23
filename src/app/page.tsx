import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function App() {
  const session = await auth();
  return (
    <div>
      {redirect("/public")}
    </div>
  );
}
