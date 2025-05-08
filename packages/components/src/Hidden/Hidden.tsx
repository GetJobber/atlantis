import classNames from "classnames";
import React from "react";
import { HiddenProps } from "./types";
import styles from "./Hidden.module.css";

export function Hidden({
  as: Tag = "div",
  dataAttributes,
  ariaAttributes,
  role,
  id,
  children,
  UNSAFE_className,
  UNSAFE_style,
  above,
  below,
}: HiddenProps) {
  return (
    <Tag
      {...dataAttributes}
      {...ariaAttributes}
      role={role}
      id={id}
      className={classNames(
        styles.hidden,
        UNSAFE_className,
        above && styles[`${above}AndUp`],
        below && styles[`${below}AndDown`],
      )}
      style={UNSAFE_style?.container}
    >
      {children}
    </Tag>
  );
}
