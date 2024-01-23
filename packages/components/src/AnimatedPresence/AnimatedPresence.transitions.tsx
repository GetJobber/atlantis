import { tokens } from "@jobber/design";
import { Variants } from "framer-motion";

export const TIMING_QUICK = toSeconds(tokens["timing-quick"]);
export const TIMING_BASE = toSeconds(tokens["timing-base"]);

const BASE_TRANSITION: Variants = {
  visible: { opacity: 1, height: "auto" },
  hidden: { opacity: 0, height: 0 },
};

export const POP_IN: Variants = {
  visible: { scale: 1, ...BASE_TRANSITION.visible },
  hidden: { scale: 0.95, ...BASE_TRANSITION.hidden },
};

export const FROM_TOP: Variants = {
  visible: { y: 0, ...BASE_TRANSITION.visible },
  hidden: { y: -tokens["space-base"], ...BASE_TRANSITION.hidden },
};

export const FROM_BOTTOM: Variants = {
  visible: { y: 0, ...BASE_TRANSITION.visible },
  hidden: { y: tokens["space-base"], ...BASE_TRANSITION.hidden },
};

export const FROM_LEFT: Variants = {
  visible: { x: 0, ...BASE_TRANSITION.visible },
  hidden: { x: -tokens["space-base"], ...BASE_TRANSITION.hidden },
};

export const FROM_RIGHT: Variants = {
  visible: { x: 0, ...BASE_TRANSITION.visible },
  hidden: { x: tokens["space-base"], ...BASE_TRANSITION.hidden },
};

function toSeconds(ms: number) {
  return ms / 1000;
}
