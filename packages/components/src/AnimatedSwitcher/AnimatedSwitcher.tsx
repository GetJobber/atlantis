import React, { ReactElement, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { IconNames } from "@jobber/design";
import { Icon } from "../Icon";

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

  /**
   * Change the transition between 2 elements.
   */
  readonly type?: "slideFromBottom" | "fade";
}

const DURATION_SIMPLE = 0.1;
const DURATION_AVERAGE = 0.2;

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
    transition: { duration: DURATION_AVERAGE, ease: "easeOut" },
  },
  hidden: {
    rotate: 180,
    scale: 0.6,
    transition: { duration: DURATION_AVERAGE, ease: "easeIn" },
  },
};

const spinClockWise: Variants = {
  visible: {
    rotate: 0,
    scale: 1,
    transition: { duration: DURATION_AVERAGE, ease: "easeOut" },
  },
  hidden: {
    rotate: -180,
    scale: 0.6,
    transition: { duration: DURATION_AVERAGE, ease: "easeIn" },
  },
};

export function AnimatedSwitcher({
  initialChild,
  switched = false,
  switchTo,
  type = "slideFromBottom",
}: AnimatedSwitcherProps) {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const isSwitchingBetweenIcons =
    initialChild.type === Icon && switchTo.type === Icon;

  const { key, transition, child, duration } = getChildData();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        ref={setRef}
        key={key}
        variants={transition}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration }}
        style={{ display: getDisplayValue() }}
      >
        {child}
      </motion.div>
    </AnimatePresence>
  );

  function getDisplayValue() {
    if (ref?.firstElementChild) {
      return window.getComputedStyle(ref.firstElementChild).display;
    }
  }

  function getChildData() {
    let data = { key: `${initialChild.type}_1`, child: initialChild };
    if (switched) {
      data = { key: `${switchTo.type}_2`, child: switchTo };
    }

    return {
      ...data,
      transition: getTransitionType(),
      duration: getTransitionDuration(),
    };
  }

  function getTransitionType(): Variants {
    if (isSwitchingBetweenIcons) {
      if (switched) return spinCounterClockWise;
      return spinClockWise;
    } else if (type === "fade") {
      return fade;
    } else {
      if (switched) return slideInUp;
      return slideInDown;
    }
  }

  function getTransitionDuration() {
    switch (type) {
      case "fade":
        return DURATION_AVERAGE;
      default:
        return DURATION_SIMPLE;
    }
  }
}

interface AnimatedSwitcherIconProps
  extends Pick<AnimatedSwitcherProps, "switched"> {
  readonly initialIcon: IconNames;
  readonly switchToIcon: IconNames;
}

AnimatedSwitcher.Icon = function AnimatedSwitcherIcon({
  switchToIcon,
  switched,
  initialIcon,
}: AnimatedSwitcherIconProps) {
  return (
    <AnimatedSwitcher
      switched={switched}
      initialChild={<Icon name={initialIcon} />}
      switchTo={<Icon name={switchToIcon} />}
    />
  );
};
