import React, { PropsWithChildren, useRef } from "react";
import { IconNames, IconSizes, getIcon } from "@jobber/design";
import { AnimatePresence, Variants, motion } from "framer-motion";

interface IconSwitcherProps {
  readonly name: IconNames;
  readonly size: IconSizes;
  readonly animated?: boolean;
}

const DURATION = 0.2;
const ICON_SPIN_CLOCKWISE: Variants = {
  initial: {
    rotate: -180,
    scale: 0.6,
    transition: { duration: DURATION, ease: "easeIn" },
  },
  animate: {
    rotate: 0,
    scale: 1,
    transition: { duration: DURATION, ease: "easeOut" },
  },
  exit: {
    rotate: 180,
    scale: 0.6,
    transition: { duration: DURATION, ease: "easeIn" },
  },
};

export function IconSwitcher({
  name,
  size,
  animated = false,
  children,
}: PropsWithChildren<IconSwitcherProps>) {
  const { svgClassNames } = getIcon({ name, size });

  if (!animated) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.span
        variants={ICON_SPIN_CLOCKWISE}
        initial="initial"
        animate="animate"
        exit="exit"
        key={name}
        className={svgClassNames}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}
