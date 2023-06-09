import React, { ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AnimatedSwitcherProps {
  /**
   * Determines when to switch the component to the `switchTo` prop.
   *
   * @default false
   */
  readonly switched?: boolean;

  /**
   * The component that shows up when the `switched` prop is `false`
   */
  readonly initialChild: ReactElement;

  /**
   * The component that shows up when the `switched` prop is `true`
   */
  readonly switchTo: ReactElement;
}

const fadeInUp = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: "10%", opacity: 0 },
};

const fadeInDown = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: "-10%", opacity: 0 },
};

export function AnimatedSwitcher({
  switched,
  initialChild,
  switchTo,
}: AnimatedSwitcherProps) {
  const { key, transition, child } = getChildData();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        key={key}
        variants={transition}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.1 }}
        style={{ display: "inline-block" }}
      >
        {child}
      </motion.div>
    </AnimatePresence>
  );

  function getChildData() {
    if (switched) {
      return { key: "2", child: switchTo, transition: fadeInUp };
    }

    return { key: "1", child: initialChild, transition: fadeInDown };
  }
}
