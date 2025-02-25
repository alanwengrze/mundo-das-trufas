import { Spinner } from "./spinner";

export function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
  )
}