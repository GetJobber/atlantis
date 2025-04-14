import React from "react";
import classNames from "classnames";
import styles from "./Container.module.css";
import { ContainerApplyProps, ContainerProps } from "./types";

export const Container = ({
  children,
  name,
  className,
  as: Tag = "div",
  autoWidth = false,
}: ContainerProps) => {
  return (
    <Tag
      style={
        {
          "--public-container-name": name,
          "--public-container-width": autoWidth ? "auto" : "100%",
        } as React.CSSProperties
      }
      className={classNames(styles.container, className)}
    >
      {children}
    </Tag>
  );
};

Container.Apply = function Apply({
  children,
  className,
  style = {},
  autoWidth = false,
}: ContainerApplyProps) {
  return (
    <div
      style={
        {
          ...style,
          "--public-container-apply-width": autoWidth ? "auto" : "100%",
        } as React.CSSProperties
      }
      className={classNames(className, styles.apply)}
    >
      {children}
    </div>
  );
};
