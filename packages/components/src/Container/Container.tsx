import React from "react";
import classNames from "classnames";
import styles from "./Container.module.css";
import { ContainerApplyProps, ContainerProps } from "./types";

export const Container = ({ children, name, className }: ContainerProps) => {
  return (
    <div
      style={
        {
          "--public-container-name": name,
        } as React.CSSProperties
      }
      className={classNames(styles.container, className)}
    >
      {children}
    </div>
  );
};

Container.Apply = function Apply({
  children,
  className,
  style = {},
}: ContainerApplyProps) {
  return (
    <div style={style} className={classNames(className, styles.apply)}>
      {children}
    </div>
  );
};
