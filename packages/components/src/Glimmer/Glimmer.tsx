import React from "react";
import classnames from "classnames";
import styles from "./Glimmer.css";
/* eslint-disable import/no-internal-modules */
import sizes from "./style/Sizes.css";
import shapes from "./style/Shape.css";
import timings from "./style/Timing.css";
/* eslint-enable import/no-internal-modules */
import { Content } from "../Content";

export type Sizes = keyof typeof sizes;
export type Shapes = keyof typeof shapes;
export type Timings = keyof typeof timings;

interface GlimmerProps {
  /**
   * Sets the size of the glimmer.
   *
   * If you use `"auto"` with a `"rectangle"` shape, it will fill the
   * size of the parents width and height. With how CSS works, if it can't
   * determine the parents width and height, it'll default to `base`.
   */
  readonly size?: Sizes;

  /**
   * Sets the shape of the glimmer.
   *
   * If you need a specific width, use the `width` prop.
   */
  readonly shape?: Shapes;

  /**
   * Control how fast the shine moves from left to right. This is useful when
   * the glimmer is used on smaller spaces.
   */
  readonly timing?: Timings;

  /**
   * Use on surfaces with dark backgrounds.
   */
  readonly reverseTheme?: boolean;

  /**
   * Adjust the width of the glimmer in px values.
   */
  readonly width?: number;
}

export const GLIMMER_TEST_ID = "ATL-Glimmer";
export const GLIMMER_HEADER_TEST_ID = "ATL-GlimmerHeader";
export const GLIMMER_TEXT_TEST_ID = "ATL-GlimmerText";
export const GLIMMER_BUTTON_TEST_ID = "ATL-GlimmerButton";

/**
 * **Experimental component! Use at your own risk.**
 *
 * Foundational component used to build loading states such as Skeleton UI
 *
 * @experimental
 */
export function Glimmer({
  size = "base",
  shape = "rectangle",
  timing = "base",
  reverseTheme = false,
  width,
}: GlimmerProps) {
  const className = classnames(
    styles.glimmer,
    sizes[size],
    shapes[shape],
    timings[timing],
    { [styles.reverseTheme]: reverseTheme },
  );

  return (
    <div
      aria-busy="true"
      className={className}
      data-testid={GLIMMER_TEST_ID}
      style={{ width }}
    />
  );
}

interface GlimmerHeaderProps extends Omit<GlimmerProps, "shape" | "size"> {
  /**
   * Adjust the size of the `Glimmer.Header`.
   *
   * @default 3
   */
  readonly level?: 1 | 2 | 3 | 4 | 5;
}

Glimmer.Header = function GlimmerHeader({
  level = 3,
  ...props
}: GlimmerHeaderProps) {
  const headerSize: Record<number, GlimmerProps["size"]> = {
    1: "largest",
    2: "larger",
    3: "large",
    4: "base",
    5: "small",
  };

  return (
    <div className={styles.header} data-testid={GLIMMER_HEADER_TEST_ID}>
      <Glimmer size={headerSize[level]} {...props} />
    </div>
  );
};

interface GlimmerTextProps extends Omit<GlimmerProps, "shape" | "size"> {
  /**
   * Set how many lines shows up.
   *
   * @default 3
   */
  readonly lines?: 1 | 2 | 3;
}

Glimmer.Text = function GlimmerText({
  width,
  lines = 3,
  ...props
}: GlimmerTextProps) {
  const children = [
    <Glimmer key="1" size="small" shape="rectangleShort" {...props} />,
    <Glimmer key="2" size="small" {...props} />,
    <Glimmer key="3" size="small" shape="rectangleShorter" {...props} />,
  ].slice(0, lines);

  return (
    <div style={{ width }} data-testid={GLIMMER_TEXT_TEST_ID}>
      <Content spacing="small">{children}</Content>
    </div>
  );
};

interface GlimmerButtonProps extends Omit<GlimmerProps, "shape" | "size"> {
  /**
   * Allow `Glimmer.Button` to go full width.
   *
   * @default false
   */
  readonly fullWidth?: boolean;
}

Glimmer.Button = function GlimmerButton({
  fullWidth = false,
  ...props
}: GlimmerButtonProps) {
  const buttonClassNames = classnames(styles.button, {
    [styles.buttonFill]: fullWidth,
  });

  return (
    <div className={buttonClassNames} data-testid={GLIMMER_BUTTON_TEST_ID}>
      <Glimmer {...props} size="auto" />
    </div>
  );
};
