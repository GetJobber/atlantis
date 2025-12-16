import type { PropsWithChildren } from "react";
import React, { Children, useEffect } from "react";
import {
  AnimatePresence,
  MotionGlobalConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
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
}

export function AnimatedPresence(props: AnimatedPresenceProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || MotionGlobalConfig.skipAnimations) {
    return <>{props.children}</>;
  }

  return <InternalAnimatedPresence {...props} />;
}

function InternalAnimatedPresence({
  transition = "fromTop",
  initial = false,
  children,
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
    <AnimatePresence initial={initial} mode="popLayout">
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
