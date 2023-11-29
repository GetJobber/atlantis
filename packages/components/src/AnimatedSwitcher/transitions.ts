import { Variants } from "framer-motion";

export const DURATION_SIMPLE = 0.1;
export const DURATION_AVERAGE = 0.2;

export const FADE: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const SLIDE_IN_UP: Variants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: "10%", opacity: 0 },
};

export const SLIDE_IN_DOWN: Variants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: "-10%", opacity: 0 },
};

export const SPIN_COUNTER_CLOCK_WISE: Variants = {
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

export const SPIN_CLOCK_WISE: Variants = {
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
