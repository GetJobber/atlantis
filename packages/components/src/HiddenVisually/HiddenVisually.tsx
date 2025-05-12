import React from "react";
import classNames from "classnames";
import { HiddenVisuallyProps } from "./types";
import styles from "./HiddenVisually.module.css";

export function HiddenVisually({
  children,
  as: Tag = "div",
  dataAttributes,
  ariaAttributes,
  role,
  id,
  UNSAFE_className,
  UNSAFE_style,
  above,
  below,
}: HiddenVisuallyProps) {
  return (
    <Tag
      {...dataAttributes}
      {...ariaAttributes}
      role={role}
      id={id}
      className={classNames(
        styles.hiddenVisually,
        UNSAFE_className,
        above && styles[`${above}AndUp`],
        below && styles[`${below}AndDown`],
      )}
      style={UNSAFE_style}
    >
      {children}
    </Tag>
  );
}
