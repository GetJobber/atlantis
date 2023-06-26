import React, { PropsWithChildren } from "react";
import { IconNames, IconSizes, getIcon } from "@jobber/design";
import { AnimatePresence, Variants, motion } from "framer-motion";

interface IconSwitcherProps {
  readonly name: IconNames;
  readonly size: IconSizes;
}

const DURATION = 0.2;
const DURATION_FAST = 0.1;

export function IconSwitcher({
  name,
  size,
  children,
}: PropsWithChildren<IconSwitcherProps>) {
  const { svgClassNames } = getIcon({ name, size });

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.span
        variants={getVariants()}
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

  function getVariants(): Variants {
    let rotate = 180;
    let scale = 0.4;
    let duration = DURATION;
    const transition = { duration, ease: "easeIn" };

    if (name.startsWith("arrow")) {
      rotate = 90;
      scale = 1;
      duration = DURATION_FAST;
    }

    return {
      initial: { rotate, scale, transition },
      animate: {
        rotate: 0,
        scale: 1,
        transition: { duration, ease: "easeOut" },
      },
      exit: { rotate: rotate * -1, scale, transition },
    };
  }
}
