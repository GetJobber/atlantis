import React, { Children, PropsWithChildren, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FROM_BOTTOM,
  FROM_LEFT,
  FROM_RIGHT,
  FROM_TOP,
  POP_IN,
  TIMING_BASE,
  TIMING_QUICK,
} from "./AnimatedPresence.transitions";
import { usePreviousValue } from "./hooks/usePreviousValue";

const transitions = {
  fromBottom: FROM_BOTTOM,
  fromTop: FROM_TOP,
  fromLeft: FROM_LEFT,
  fromRight: FROM_RIGHT,
  popIn: POP_IN,
};

interface AnimatedPresenceProps extends Required<PropsWithChildren> {
  readonly transition?: keyof typeof transitions;
  readonly initial?: boolean;
  readonly exitBeforeEnter?: boolean;
}

export function AnimatedPresence({
  transition = "fromTop",
  initial = false,
  exitBeforeEnter = false,
  children,
}: AnimatedPresenceProps) {
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
              variants={transitions[transition]}
              initial="hidden"
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
