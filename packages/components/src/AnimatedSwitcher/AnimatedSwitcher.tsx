import React, { ReactElement, useState } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { IconNames } from "@jobber/design";
import {
  DURATION_AVERAGE,
  DURATION_SIMPLE,
  FADE,
  SLIDE_IN_DOWN,
  SLIDE_IN_UP,
  SPIN_CLOCK_WISE,
  SPIN_COUNTER_CLOCK_WISE,
} from "./transitions";
import { Icon } from "../Icon";

export interface AnimatedSwitcherProps {
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
      if (switched) return SPIN_COUNTER_CLOCK_WISE;
      return SPIN_CLOCK_WISE;
    } else if (type === "fade") {
      return FADE;
    } else {
      if (switched) return SLIDE_IN_UP;
      return SLIDE_IN_DOWN;
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
