import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";


export function Spinner() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.5, 1],
      }}
    >
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </motion.div>
  )
}
