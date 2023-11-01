import React from "react";
import { getIcon } from "@jobber/design";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { Icon, IconProps } from "@jobber/components/Icon";

const DURATION = 0.2;
const DURATION_FAST = 0.1;

export function IconAnimated(props: IconProps) {
  const { svgClassNames } = getIcon(props);

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.span
        variants={getVariants()}
        initial="initial"
        animate="animate"
        exit="exit"
        key={props.name}
        className={svgClassNames}
      >
        <Icon {...props} />
      </motion.span>
    </AnimatePresence>
  );

  function getVariants(): Variants {
    let rotate = 180;
    let scale = 0.4;
    let duration = DURATION;
    const transition = { duration, ease: "easeIn" };

    if (props.name.startsWith("arrow")) {
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
