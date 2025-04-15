import React from "react";
import styles from "./Frame.module.css";
import { FrameProps } from "./types";
import {
  ariaPropsMapped,
  dataPropsMapped,
} from "../sharedHooks/useCommonProps";

export function Frame({
  children,
  aspectX = 16,
  aspectY = 9,
  as: Tag = "div",
  data,
  aria,
  role,
  id,
}: FrameProps) {
  return (
    <Tag
      role={role}
      id={id}
      {...dataPropsMapped(data)}
      {...ariaPropsMapped(aria)}
      className={styles.frame}
      style={
        {
          "--public-frame-numerator": aspectX,
          "--public-frame-denominator": aspectY,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
