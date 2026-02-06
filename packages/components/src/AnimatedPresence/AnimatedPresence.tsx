import type { PropsWithChildren } from "react";
import React, { Children, useEffect } from "react";
import type { tokens } from "@jobber/design";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  TIMING_BASE,
  TIMING_LOADING,
  TIMING_LOADING_EXTENDED,
  TIMING_QUICK,
  TIMING_SLOW,
  TIMING_SLOWER,
  TIMING_SLOWEST,
  fade,
  fromBottom,
  fromLeft,
  fromLeftToRight,
  fromRight,
  fromRightToLeft,
  fromTop,
  popIn,
} from "./AnimatedPresence.transitions";
import { usePreviousValue } from "./hooks/usePreviousValue";

const timingMap = {
  "timing-base": TIMING_BASE,
  "timing-quick": TIMING_QUICK,
  "timing-slow": TIMING_SLOW,
  "timing-slower": TIMING_SLOWER,
  "timing-slowest": TIMING_SLOWEST,
  "timing-loading": TIMING_LOADING,
  "timing-loading--extended": TIMING_LOADING_EXTENDED,
};

const transitions = {
  fromBottom,
  fromTop,
  fromLeft,
  fromRight,
  popIn,
  fromLeftToRight,
  fromRightToLeft,
  fade,
};

const exitBehaviorMap: Record<ExitBehavior, "wait" | "sync" | "popLayout"> = {
  overlap: "sync",
  replace: "popLayout",
  sequential: "wait",
};

type Timing = {
  [K in keyof typeof tokens]: K extends `timing-${string}` ? K : never;
}[keyof typeof tokens];

export type AnimatedPresenceTransitions = keyof typeof transitions;

type ExitBehavior = "overlap" | "replace" | "sequential";

interface AnimatedPresenceProps extends Required<PropsWithChildren> {
  /**
   * The type of transition you can use.
   */
  readonly transition?: AnimatedPresenceTransitions;
  /**
   * The timing of the animation.
   */
  readonly timing?: Timing;

  /**
   * The mode of the animation.
   *
   * @default "popLayout"
   */
  readonly exitBehavior?: ExitBehavior;

  /**
   * Whether or not to animate the children on mount. By default it's set to false.
   */
  readonly initial?: boolean;
}

export function AnimatedPresence(props: AnimatedPresenceProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{props.children}</>;
  }

  return <InternalAnimatedPresence {...props} />;
}

function InternalAnimatedPresence({
  transition = "fromTop",
  initial = false,
  exitBehavior = "replace",
  children,
  timing = "timing-base",
}: AnimatedPresenceProps) {
  const transitionVariation = transitions[transition];
  const hasInitialTransition = "initial" in transitionVariation;
  const childCount = Children.count(children);

  // Set the initial value to 0 so it staggers the animation on mount when
  // initial is true.
  const [lastChildIndex, setLastChildIndex] = usePreviousValue(0);

  // Whenever the children count changes, update the last index.
  useEffect(() => {
    setLastChildIndex(childCount - 1);
  }, [childCount]);

  return (
    <AnimatePresence initial={initial} mode={exitBehaviorMap[exitBehavior]}>
      {Children.map(
        children,
        (child, i) =>
          child && (
            <motion.div
              layout
              variants={transitionVariation}
              initial={hasInitialTransition ? "initial" : "hidden"}
              animate="visible"
              exit="hidden"
              transition={{
                duration: timingMap[timing],
                delay: generateDelayTime(i),
              }}
            >
              {child}
            </motion.div>
          ),
      )}
    </AnimatePresence>
  );

  function generateDelayTime(index: number): number {
    // Don't add a delay if it's already rendered.
    if (lastChildIndex > index) return 0;

    // Stagger the animation starting after the previous last child index.
    return (index - lastChildIndex) * TIMING_QUICK;
  }
}
