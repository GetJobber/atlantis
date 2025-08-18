import { tokens } from "@jobber/design";
import type { Variants } from "framer-motion";

export const TIMING_QUICK = toSeconds(tokens["timing-quick"]);
export const TIMING_BASE = toSeconds(tokens["timing-base"]);

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
