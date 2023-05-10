import React from "react";
import { motion } from "framer-motion";

export function AnimatedTextWord({ text }: { text: string }) {
  const words = text.split(" ");

  // Variants for Container of words.
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each word.

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        duration: 0.1,
      },
    },
  };

  return (
    <motion.div
      style={{
        width: "auto",
        padding: "var(--base-unit)",
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{
            marginRight: "5px",
            // overflowWrap: "break-word",
          }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
