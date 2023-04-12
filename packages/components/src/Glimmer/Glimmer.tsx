import React from "react";
import classnames from "classnames";
import styles from "./Glimmer.css";
/* eslint-disable import/no-internal-modules */
import sizes from "./style/Sizes.css";
import shapes from "./style/Shape.css";
import timings from "./style/Timing.css";

export type Sizes = keyof typeof sizes;
export type Shapes = keyof typeof shapes;
export type Timings = keyof typeof timings;

/* eslint-enable import/no-internal-modules */

interface GlimmerProps {
  /**
   * Sets the size of the glimmer.
   */
  readonly size?: Sizes;

  /**
   * Sets the shape of the glimmer.
   */
  readonly shape?: Shapes;

  /**
   * Control how fast the shine moves from left to right. This is useful when
   * the glimmer is used on smaller spaces.
   */
  readonly timing?: Timings;
}

export const GLIMMER_TEST_ID = "ATL-Glimmer";

/**
 * **Experimental component! Use at your own risk.**
 *
 * Foundational component used to build loading states such as Skeleton UI
 *
 @experimental
 */
export function Glimmer({
  size = "base",
  shape = "rectangle",
  timing = "base",
}: GlimmerProps) {
  const className = classnames(
    styles.glimmer,
    sizes[size],
    shapes[shape],
    timings[timing],
  );

  return (
    <div aria-busy="true" className={className} data-testid={GLIMMER_TEST_ID} />
  );
}
