import React, { Children, PropsWithChildren, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  TIMING_BASE,
  TIMING_QUICK,
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

export type AnimatedPresenceTransitions = keyof typeof transitions;

interface AnimatedPresenceProps extends Required<PropsWithChildren> {
  /**
   * The type of transition you can use.
   */
  readonly transition?: AnimatedPresenceTransitions;

  /**
   * Whether or not to animate the children on mount. By default it's set to false.
   */
  readonly initial?: boolean;

  /**
   * If you only have 1 element visible at all times, like a setup wizard or a
   * page, This ensures the transition between the previous and next elements
   * doesn't overlap.
   *
   * Using this with multiple elements visible at the same time will cause an
   * unexpected behavior.
   */
  readonly exitBeforeEnter?: boolean;
}

export function AnimatedPresence({
  transition = "fromTop",
  initial = false,
  exitBeforeEnter = false,
  children,
}: AnimatedPresenceProps) {
  const reducedMotion = useReducedMotion();
  const transitionVariation = reducedMotion ? fade : transitions[transition];
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
    <AnimatePresence initial={initial} exitBeforeEnter={exitBeforeEnter}>
      {Children.map(
        children,
        (child, i) =>
          child && (
            <motion.div
              variants={transitionVariation}
              initial={hasInitialTransition ? "initial" : "hidden"}
              animate="visible"
              exit="hidden"
              transition={{
                duration: TIMING_BASE,
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
