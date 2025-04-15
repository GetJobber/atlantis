import React from "react";
import classNames from "classnames";
import styles from "./Frame.module.css";
import { FrameProps } from "./types";
import {
  ariaPropsMapped,
  dataPropsMapped,
} from "../sharedHelpers/getCommonProps";

export function Frame({
  children,
  aspectX = 16,
  aspectY = 9,
  as: Tag = "div",
  data,
  aria,
  role,
  id,
  UNSAFE_className,
  UNSAFE_style,
}: FrameProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...dataPropsMapped(data)}
      {...ariaPropsMapped(aria)}
      className={classNames(styles.frame, UNSAFE_className?.container)}
      style={
        {
          "--public-frame-numerator": aspectX,
          "--public-frame-denominator": aspectY,
          ...UNSAFE_style?.container,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
