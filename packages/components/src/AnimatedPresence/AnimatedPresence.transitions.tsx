import { tokens } from "@jobber/design";
import type { Variants } from "framer-motion";

export const TIMING_QUICK = toSeconds(tokens["timing-quick"]);
export const TIMING_BASE = toSeconds(tokens["timing-base"]);
export const TIMING_SLOW = toSeconds(tokens["timing-slow"]);
export const TIMING_SLOWER = toSeconds(tokens["timing-slower"]);
export const TIMING_SLOWEST = toSeconds(tokens["timing-slowest"]);
export const TIMING_LOADING = toSeconds(tokens["timing-loading"]);
export const TIMING_LOADING_EXTENDED = toSeconds(
  tokens["timing-loading--extended"],
);

const baseTransition: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const fade: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const popIn: Variants = {
  visible: { scale: 1, ...baseTransition.visible },
  hidden: { scale: 0.95, ...baseTransition.hidden },
};

export const fromTop: Variants = {
  visible: { y: 0, ...baseTransition.visible },
  hidden: { y: -tokens["space-base"], ...baseTransition.hidden },
};

export const fromBottom: Variants = {
  visible: { y: 0, ...baseTransition.visible },
  hidden: { y: tokens["space-base"], ...baseTransition.hidden },
};

export const fromLeft: Variants = {
  visible: { x: 0, ...baseTransition.visible },
  hidden: { x: -tokens["space-base"], ...baseTransition.hidden },
};

export const fromRight: Variants = {
  visible: { x: 0, ...baseTransition.visible },
  hidden: { x: tokens["space-base"], ...baseTransition.hidden },
};

export const fromLeftToRight: Variants = {
  initial: { x: -tokens["space-base"], ...baseTransition.hidden },
  visible: { x: 0, ...baseTransition.visible },
  hidden: { x: tokens["space-base"], ...baseTransition.hidden },
};

export const fromRightToLeft: Variants = {
  initial: { x: tokens["space-base"], ...baseTransition.hidden },
  visible: { x: 0, ...baseTransition.visible },
  hidden: { x: -tokens["space-base"], ...baseTransition.hidden },
};

function toSeconds(ms: number) {
  return ms / 1000;
}
