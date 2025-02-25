import { Spinner } from "./spinner";
import { motion } from "motion/react";
export function Loader() {
  return (
    <motion.div 
      className="flex items-center justify-center h-screen">
      <Spinner />
    </motion.div>
  )
}