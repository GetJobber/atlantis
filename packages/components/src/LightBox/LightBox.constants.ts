import type { RefObject } from "react";

// A little bit more than the transition's duration
// We're doing this to prevent a bug from framer-motion
// https://github.com/framer/motion/issues/1769
export const BUTTON_DEBOUNCE_DELAY = 250;
export const MOVEMENT_DEBOUNCE_DELAY = 1000;

export const swipeConfidenceThreshold = 10000;

export const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const slideVariants = {
  enter: (directionRef: RefObject<number>) => ({
    x: directionRef.current > 0 ? "150%" : "-150%",
  }),
  center: {
    x: 0,
  },
  exit: (directionRef: RefObject<number>) => ({
    x: directionRef.current < 0 ? "150%" : "-150%",
  }),
};

export const imageTransition = {
  x: { duration: 0.65, ease: [0.42, 0, 0, 1.03] },
};
