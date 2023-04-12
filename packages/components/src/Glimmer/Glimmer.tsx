// TODO FIX ME
/* eslint-disable import/no-internal-modules */
import React from "react";
import classnames from "classnames";
import styles from "./Glimmer.css";
import sizes from "./style/Sizes.css";
import shapes from "./style/Shape.css";

interface GlimmerProps {
  readonly size?: keyof typeof sizes;
  readonly shape?: keyof typeof shapes;
}

export const GLIMMER_TEST_ID = "ATL-Glimmer";

export function Glimmer({ size = "base", shape = "rectangle" }: GlimmerProps) {
  const className = classnames(styles.glimmer, sizes[size], shapes[shape]);

  return (
    <div aria-busy="true" className={className} data-testid={GLIMMER_TEST_ID} />
  );
}
