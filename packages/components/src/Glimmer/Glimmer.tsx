// TODO FIX ME
/* eslint-disable import/no-internal-modules */
import React from "react";
import classnames from "classnames";
import styles from "./Glimmer.css";
import sizes from "./style/Sizes.css";
import corners from "./style/Corner.css";
import shapes from "./style/Shape.css";

interface GlimmerProps {
  readonly size?: keyof typeof sizes;
  readonly corner?: keyof typeof corners;
  readonly shape?: keyof typeof shapes;
}

export const GLIMMER_TEST_ID = "ATL-Glimmer";

export function Glimmer({
  size = "base",
  corner = "base",
  shape = "rectangle",
}: GlimmerProps) {
  const className = classnames(
    styles.glimmer,
    sizes[size],
    corners[corner],
    shapes[shape],
  );

  return (
    <div aria-busy="true" className={className} data-testid={GLIMMER_TEST_ID} />
  );
}
