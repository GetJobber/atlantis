import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { animationVariants } from "./animationVariants";
import { transitionStyle } from "./transitionStyle";

interface AnimateProps {
  readonly type: keyof typeof animationVariants;
  readonly children: ReactNode | ReactNode[];
  readonly className?: string;
  readonly key?: string;
  readonly transition?: keyof typeof transitionStyle;
}

export function Animate({
  type = "slideDown",
  className,
  children,
  key,
  transition = "bounce",
}: AnimateProps) {
  return (
    <motion.div
      key={key}
      className={className}
      variants={animationVariants[type]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transitionStyle[transition]}
    >
      {children}
    </motion.div>
  );
}
