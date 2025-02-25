import { redirect } from "next/navigation";
export default async function App() {
  return (
    <div>
      {redirect("/public")}
    </div>
  );
}
