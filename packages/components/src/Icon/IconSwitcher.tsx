import React, { PropsWithChildren } from "react";
import { IconNames, IconSizes, getIcon } from "@jobber/design";
import { AnimatePresence, Variants, motion } from "framer-motion";

interface IconSwitcherProps {
  readonly name: IconNames;
  readonly size: IconSizes;
  readonly animated?: boolean;
}

const DURATION = 0.2;

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
    const transition = { duration: DURATION, ease: "easeIn" };

    if (name.startsWith("arrow")) {
      rotate = 90;
      scale = 1;
    }

    return {
      initial: { rotate, scale, transition },
      animate: {
        rotate: 0,
        scale: 1,
        transition: { duration: DURATION, ease: "easeOut" },
      },
      exit: { rotate: rotate * -1, scale, transition },
    };
  }
}
