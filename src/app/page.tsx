"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function App() {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user.role !== "ADMIN" ? redirect("/public") : redirect("/admin")}
    </div>
  );
}
