import React, { ReactElement } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";

interface AnimatedSwitcherProps {
  /**
   * Determines when to switch the component to the `switchTo` prop.
   *
   * @default false
   */
  readonly switched: boolean;

  /**
   * The component that shows up when the `switched` prop is `false`
   */
  readonly initialChild: ReactElement;

  /**
   * The component that shows up when the `switched` prop is `true`
   */
  readonly switchTo: ReactElement;

  readonly type?: "slideVertical" | "fade" | "icon";
}

const slideInUp = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: "10%", opacity: 0 },
};

const slideInDown = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: "-10%", opacity: 0 },
};

const fade = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const spinCounterClockWise: Variants = {
  visible: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hidden: {
    rotate: 180,
    scale: 0.6,
    opacity: 0.1,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

const spinClockWise: Variants = {
  visible: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hidden: {
    rotate: -180,
    scale: 0.6,
    opacity: 0.1,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

export function AnimatedSwitcher({
  switched = false,
  initialChild,
  switchTo,
  type = "slideVertical",
}: AnimatedSwitcherProps) {
  const { key, transition, child, duration } = getChildData();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        key={key}
        variants={transition}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration }}
        style={{ display: "inline-block" }}
      >
        {child}
      </motion.div>
    </AnimatePresence>
  );

  function getChildData() {
    let data = { key: "1", child: initialChild };
    if (switched) {
      data = { key: "2", child: switchTo };
    }

    return {
      ...data,
      transition: getTransitionType(),
      duration: getTransitionDuration(),
    };
  }

  function getTransitionType() {
    switch (type) {
      case "fade":
        return fade;
      case "icon":
        if (switched) return spinCounterClockWise;
        return spinClockWise;
      default:
        if (switched) return slideInUp;
        return slideInDown;
    }
  }

  function getTransitionDuration() {
    switch (type) {
      case "fade":
        return 0.2;
      default:
        return 0.1;
    }
  }
}
