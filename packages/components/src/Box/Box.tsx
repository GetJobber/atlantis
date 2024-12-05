import React from "react";
import classnames from "classnames";
import { getBorderClassNames, getBorderVars } from "./utils/getBoxConfig";
import {
  getHeightClassName,
  getHeightVars,
  getWidthClassName,
  getWidthVars,
} from "./utils/getBoxDimension";
import {
  getMarginClassNames,
  getMarginVars,
  getPaddingClassNames,
  getPaddingVars,
} from "./utils/getBoxSpaces";
import type { BoxProps } from "./Box.types";
import styles from "./styles/Box.module.css";
import gapStyles from "./styles/BoxGap.module.css";
import radiusStyles from "./styles/BoxRadius.module.css";

export function Box({
  alignItems,
  alignSelf,
  as: Tag = "div",
  background,
  border,
  borderColor,
  children,
  direction,
  gap,
  height = "auto",
  justifyContent,
  margin,
  overflow,
  padding,
  position = "relative",
  preserveWhiteSpace,
  radius,
  width = "auto",
  ...props
}: BoxProps) {
  return (
    <Tag
      {...props}
      className={classnames(
        styles.box,
        preserveWhiteSpace && styles["preserve-white-space"],
        getPaddingClassNames(padding),
        getMarginClassNames(margin),
        getHeightClassName(height),
        getWidthClassName(width),
        getBorderClassNames(border),
        radius && radiusStyles[`radius-${radius}`],
        gap && gapStyles[`gap-${gap}`],
      )}
      style={{
        ...getPaddingVars(padding),
        ...getMarginVars(margin),
        ...getHeightVars(height),
        ...getWidthVars(width),
        ...getBorderVars(border),
        ...(background && { backgroundColor: `var(--color-${background})` }),
        ...(borderColor && { borderColor: `var(--color-${borderColor})` }),
        alignItems,
        alignSelf,
        flexDirection: direction,
        justifyContent,
        overflow,
        position,
      }}
    >
      {children}
    </Tag>
  );
}
