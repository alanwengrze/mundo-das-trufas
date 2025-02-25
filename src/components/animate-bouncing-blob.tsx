"use client";

import { motion } from "framer-motion";

export function AnimateBouncingBlob() {
  return (
    <motion.div
      className="absolute w-32 h-32 bg-primary rounded-full top-0 left-0 dark:bg-blue-200"
      animate={{
        scale: [1, 1.1, 1],
        x: [30, 100, 500, 200],
        y: [30, 150, 50],
        opacity: [1, 1.5],
        rotate: [0, 360, 0],
        borderRadius: ["20%", "50%", "20%"],
        background: "linear-gradient(97deg, rgba(93,1,71,1) 0%, rgba(228,97,169,0.969626168224299) 45%, rgba(253,164,175,1) 100%)"
      }}
      transition={{
        duration: 12,
        ease: "circIn",
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
}

function getRandom() {
  return Math.random() * 100 + 200;
}

// Função para variar a duração da animação
function getRandomDuration() {
  return Math.random() * 8 + 10;
}
