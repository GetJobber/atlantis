import React, { Children, PropsWithChildren } from "react";
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
  readonly type?: keyof typeof transitions;
  readonly inline?: boolean;
}

export function AnimatedPresence({
  type = "fromTop",
  children,
}: AnimatedPresenceProps) {
  const lastChildIndex = usePreviousValue(Children.count(children) - 1);

  return (
    <AnimatePresence initial={false}>
      {Children.map(
        children,
        (child, i) =>
          child && (
            <motion.div
              variants={transitions[type]}
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
    if (lastChildIndex > index) return 0;

    return (index - lastChildIndex) * TIMING_QUICK;
  }
}
