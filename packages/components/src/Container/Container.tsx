import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./Container.module.css";

export const Container = ({
  children,
  name,
  className,
}: {
  readonly children: ReactNode;
  readonly name: string;
  readonly className?: string;
}) => {
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
